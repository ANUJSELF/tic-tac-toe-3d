import React from 'react';
import { Player } from '../types';

interface SquareProps {
  value: Player | null;
  onClick: () => void;
  isWinning: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinning }) => {
  return (
    <button
      className={`w-24 h-24 text-4xl font-bold rounded-lg transition-all duration-200 
        ${!value ? 'hover:bg-gray-100' : ''} 
        ${isWinning ? 'bg-green-100' : 'bg-white'} 
        ${value === 'X' ? 'text-blue-600' : 'text-red-600'}
        shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;