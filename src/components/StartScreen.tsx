import React, { useState } from 'react';
import { Users, Bot, Play, Trophy, Moon, Sun } from 'lucide-react';
import { GameMode } from '../types/game';
import { useTheme } from '../contexts/ThemeContext';
import { useGame } from '../contexts/GameContext';

interface StartScreenProps {
  onStartGame: (mode: GameMode, rounds: number) => Promise<void>;
}

export function StartScreen({ onStartGame }: StartScreenProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>('pvp');
  const [rounds, setRounds] = useState(5);
  const { isDark, toggleTheme } = useTheme();
  const { state, startGame } = useGame();

  const handleStartGame = async () => {
    await startGame(selectedMode, rounds);
    await onStartGame(selectedMode, rounds);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="w-8" /> {/* Spacer */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dice Duel
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Choose your game mode and number of rounds
          </p>
        </div>

        {/* Game Mode Selection */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Game Mode</h2>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setSelectedMode('pvp')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMode === 'pvp'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-500" />
                <div className="text-left">
                  <div className="font-medium text-slate-800 dark:text-slate-200">Player vs Player</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Two human players</div>
                </div>
              </div>
            </button>
            <button
              onClick={() => setSelectedMode('pvc')}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedMode === 'pvc'
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-purple-500" />
                <div className="text-left">
                  <div className="font-medium text-slate-800 dark:text-slate-200">Player vs Computer</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Challenge the AI</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Rounds Selection */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Number of Rounds</h2>
          <div className="flex gap-2">
            {[3, 5, 7, 10].map((num) => (
              <button
                key={num}
                onClick={() => setRounds(num)}
                className={`flex-1 py-3 rounded-xl font-medium transition-all duration-200 ${
                  rounds === num
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Game History */}
        {state.gameHistory.length > 0 && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">Recent Games</h2>
            <div className="space-y-2">
              {state.gameHistory.slice(0, 3).map((game, index) => (
                <div key={game.timestamp} className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">
                    {game.isDraw ? 'Draw' : `${game.winner?.name} won`}
                  </span>
                  <span className="text-slate-500 dark:text-slate-500">
                    {game.finalScores[0]} - {game.finalScores[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={handleStartGame}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
        >
          <Play className="w-5 h-5" />
          Start Game
        </button>
      </div>
    </div>
  );
}