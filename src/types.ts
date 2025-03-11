export type Player = 'X' | 'O';
export type BoardState = (Player | null)[];
export type GameStatus = 'playing' | 'won' | 'draw';
export type GameMode = 'ai' | 'local' | 'private';

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  scores: {
    X: number;
    O: number;
  };
  playerNames: {
    X: string;
    O: string;
  };
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}