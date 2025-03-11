import React from 'react';
import { GameMode } from '../types';
import { TowerControl as GameController, Users, Notebook as Robot, Lock, LogOut } from 'lucide-react';
import ThreeScene from './ThreeScene';

interface MainMenuProps {
  onSelectMode: (mode: GameMode) => void;
  onLogout: () => void;
  username: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ onSelectMode, onLogout, username }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[400px]">
        <div className="mb-8">
          <ThreeScene />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Welcome, {username}!
        </h2>
        
        <div className="space-y-3 mt-6">
          <button
            onClick={() => onSelectMode('local')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <GameController size={20} />
            Play Game
          </button>
          
          <button
            onClick={() => onSelectMode('ai')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Robot size={20} />
            Play with AI
          </button>
          
          <button
            onClick={() => onSelectMode('private')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Lock size={20} />
            Create Private Room
          </button>
          
          <button
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Users size={20} />
            Join Private Room
          </button>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;