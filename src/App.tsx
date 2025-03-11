import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Trophy } from 'lucide-react';
import Board from './components/Board';
import MainMenu from './components/MainMenu';
import LoginForm from './components/LoginForm';
import { Player, BoardState, GameState, GameMode, User } from './types';
import { calculateWinner, getGameStatus } from './utils/gameLogic';
import { findBestMove } from './utils/aiLogic';

function App() {
  const initialState: GameState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    scores: { X: 0, O: 0 },
    playerNames: { X: '', O: '' }
  };

  const [gameState, setGameState] = useState<GameState>(initialState);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [user, setUser] = useState<User>({ username: '', isLoggedIn: false });
  const [gameMode, setGameMode] = useState<GameMode | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);

  useEffect(() => {
    if (gameMode === 'ai' && gameState.currentPlayer === 'O' && gameState.status === 'playing') {
      setIsAIThinking(true);
      // Add a small delay to make AI moves feel more natural
      const timeoutId = setTimeout(() => {
        const aiMove = findBestMove(gameState.board, 'O');
        handleSquareClick(aiMove);
        setIsAIThinking(false);
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [gameState.currentPlayer, gameMode]);

  const handleLogin = (username: string) => {
    setUser({ username, isLoggedIn: true });
  };

  const handleLogout = () => {
    setUser({ username: '', isLoggedIn: false });
    setGameMode(null);
    setGameState(initialState);
  };

  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setGameState({
      ...initialState,
      playerNames: {
        X: user.username,
        O: mode === 'ai' ? 'AI' : 'Player 2'
      }
    });
  };

  const handleSquareClick = (index: number) => {
    if (gameState.board[index] || gameState.status === 'won' || isAIThinking) return;

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;

    const { winner, line } = calculateWinner(newBoard);
    setWinningLine(line);

    if (winner) {
      const newScores = { ...gameState.scores };
      newScores[winner]++;
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 3000);
      
      setGameState({
        ...gameState,
        board: newBoard,
        status: 'won',
        winner,
        scores: newScores
      });
    } else {
      setGameState({
        ...gameState,
        board: newBoard,
        currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
        status: getGameStatus(newBoard)
      });
    }
  };

  const resetGame = () => {
    setGameState({
      ...initialState,
      scores: gameState.scores,
      playerNames: gameState.playerNames
    });
    setWinningLine(null);
    setShowCongrats(false);
  };

  if (!user.isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (!gameMode) {
    return (
      <MainMenu
        onSelectMode={handleModeSelect}
        onLogout={handleLogout}
        username={user.username}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <X className="text-blue-600" />
            Tic Tac Toe
          </h1>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">
            {gameState.playerNames.X}: {gameState.scores.X}
            <Trophy className="inline-block ml-2 text-yellow-500" size={20} />
          </div>
          <div className="text-lg font-semibold">
            {gameState.playerNames.O}: {gameState.scores.O}
            <Trophy className="inline-block ml-2 text-yellow-500" size={20} />
          </div>
        </div>

        <div className="text-xl font-semibold text-center mb-4">
          {isAIThinking ? (
            <div className="text-indigo-600">AI is thinking...</div>
          ) : gameState.status === 'won' ? (
            `${gameState.playerNames[gameState.winner!]} wins!`
          ) : gameState.status === 'draw' ? (
            "It's a draw!"
          ) : (
            `${gameState.playerNames[gameState.currentPlayer]}'s turn`
          )}
        </div>

        {showCongrats && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-xl shadow-2xl animate-bounce">
            <h2 className="text-3xl font-bold text-indigo-600">
              🎉 Congratulations! 🎉
            </h2>
            <p className="text-xl mt-2">
              {gameState.playerNames[gameState.winner!]} wins!
            </p>
          </div>
        )}

        <div className="mb-6">
          <Board
            squares={gameState.board}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
          />
        </div>

        <button
          onClick={() => setGameMode(null)}
          className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default App;