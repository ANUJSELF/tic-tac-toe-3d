import { BoardState, Player, GameStatus } from '../types';

export const calculateWinner = (squares: BoardState): { winner: Player | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }

  return { winner: null, line: null };
};

export const getGameStatus = (squares: BoardState): GameStatus => {
  const { winner } = calculateWinner(squares);
  if (winner) return 'won';
  if (squares.every(square => square !== null)) return 'draw';
  return 'playing';
};