import React from 'react';
import { Dice1, ArrowRight, Home } from 'lucide-react';
import { useGame } from '../contexts/GameContext';
import { useSoundEffects } from '../hooks/useSoundEffects';

interface GameControlsProps {
  activePlayer: 0 | 1;
  canRoll: boolean;
  roundComplete: boolean;
  isGameComplete: boolean;
  onRoll: () => void;
  onNextRound: () => void;
}

export function GameControls({ 
  activePlayer, 
  canRoll, 
  roundComplete, 
  isGameComplete, 
  onRoll, 
  onNextRound 
}: GameControlsProps) {
  const { state } = useGame();
  const { playRollSound, playClickSound } = useSoundEffects();

  const handleRoll = () => {
    playRollSound();
    const playerName = currentPlayer.name;
    onRoll(playerName);
  };

  const handleNextRound = () => {
    playClickSound();
    onNextRound();
  };

  const currentPlayer = state.players[activePlayer];

  if (isGameComplete) {
    return (
      <div className="text-center">
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-slate-500 to-slate-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-slate-600 hover:to-slate-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
        >
          <Home className="w-5 h-5" />
          Back to Menu
        </button>
      </div>
    );
  }

  if (roundComplete) {
    return (
      <div className="text-center">
        <button
          onClick={handleNextRound}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-2 mx-auto"
        >
          Next Round
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  if (!canRoll) {
    return (
      <div className="text-center">
        <div className="text-slate-600 dark:text-slate-400 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          <span>Rolling dice...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
          {currentPlayer.name}'s Turn
        </div>
        {currentPlayer.isComputer && (
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Computer is thinking...
          </div>
        )}
      </div>
      
      {!currentPlayer.isComputer && (
        <button
          onClick={handleRoll}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center gap-3 mx-auto"
        >
          <Dice1 className="w-6 h-6" />
          Roll Dice
        </button>
      )}
    </div>
  );
}