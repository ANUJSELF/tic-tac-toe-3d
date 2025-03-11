import React from 'react';
import { Player, BoardState } from '../types';
import Square from './Square';

interface BoardProps {
  squares: BoardState;
  onSquareClick: (index: number) => void;
  winningLine: number[] | null;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, winningLine }) => {
  const renderSquare = (index: number) => {
    const isWinning = winningLine?.includes(index) || false;
    
    return (
      <Square
        key={index}
        value={squares[index]}
        onClick={() => onSquareClick(index)}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 w-[300px]">
      {Array(9).fill(null).map((_, i) => renderSquare(i))}
    </div>
  );
};

export default Board;