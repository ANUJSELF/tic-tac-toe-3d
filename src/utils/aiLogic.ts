import { BoardState, Player } from '../types';

interface MinimaxResult {
  score: number;
  move: number | null;
}

export const findBestMove = (board: BoardState, aiPlayer: Player): number => {
  const availableMoves = board.reduce((moves: number[], cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);

  if (availableMoves.length === 9) {
    // If board is empty, choose a random corner or center
    const firstMoves = [0, 2, 4, 6, 8];
    return firstMoves[Math.floor(Math.random() * firstMoves.length)];
  }

  const result = minimax(board, aiPlayer, aiPlayer);
  return result.move !== null ? result.move : availableMoves[0];
};

const minimax = (
  board: BoardState,
  player: Player,
  aiPlayer: Player,
  depth: number = 0,
  alpha: number = -Infinity,
  beta: number = Infinity
): MinimaxResult => {
  const winner = checkWinner(board);
  
  if (winner === aiPlayer) return { score: 10 - depth, move: null };
  if (winner === (aiPlayer === 'X' ? 'O' : 'X')) return { score: depth - 10, move: null };
  if (isBoardFull(board)) return { score: 0, move: null };

  const isMaximizing = player === aiPlayer;
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove: number | null = null;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = player;
      const nextPlayer: Player = player === 'X' ? 'O' : 'X';
      const score = minimax(board, nextPlayer, aiPlayer, depth + 1, alpha, beta).score;
      board[i] = null;

      if (isMaximizing) {
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
        alpha = Math.max(alpha, bestScore);
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
        beta = Math.min(beta, bestScore);
      }

      if (beta <= alpha) break;
    }
  }

  return { score: bestScore, move: bestMove };
};

const checkWinner = (board: BoardState): Player | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

const isBoardFull = (board: BoardState): boolean => {
  return board.every(cell => cell !== null);
};