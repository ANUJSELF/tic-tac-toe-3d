import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-[400px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Lock size={20} />
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;