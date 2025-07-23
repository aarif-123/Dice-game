import React from 'react';
import { Trophy, Target } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

export function Scoreboard() {
  const { state } = useGame();

  const getRoundResult = () => {
    if (!state.lastRolls[0] || !state.lastRolls[1]) return null;
    
    const roll1 = state.lastRolls[0].value;
    const roll2 = state.lastRolls[1].value;
    
    if (roll1 > roll2) return 0;
    if (roll2 > roll1) return 1;
    return 'draw';
  };

  const roundWinner = getRoundResult();

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Player 1 Score */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P1</span>
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              {state.players[0].name}
            </h3>
          </div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {state.players[0].score}
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <Trophy className="w-4 h-4" />
            {state.players[0].roundWins} wins
          </div>
        </div>

        {/* Current Round Result */}
        <div className="text-center">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Current Round</div>
          {state.lastRolls[0] && state.lastRolls[1] ? (
            <div className="space-y-2">
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                {state.lastRolls[0].value} vs {state.lastRolls[1].value}
              </div>
              <div className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                roundWinner === 0 ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' :
                roundWinner === 1 ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' :
                'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}>
                {roundWinner === 'draw' ? 'Draw!' : 
                 roundWinner !== null ? `${state.players[roundWinner].name} wins!` : 
                 'Rolling...'}
              </div>
            </div>
          ) : (
            <div className="text-slate-500 dark:text-slate-500">
              <Target className="w-8 h-8 mx-auto mb-2" />
              Waiting for rolls...
            </div>
          )}
        </div>

        {/* Player 2 Score */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {state.players[1].isComputer ? 'AI' : 'P2'}
              </span>
            </div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">
              {state.players[1].name}
            </h3>
          </div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {state.players[1].score}
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-slate-600 dark:text-slate-400">
            <Trophy className="w-4 h-4" />
            {state.players[1].roundWins} wins
          </div>
        </div>
      </div>
    </div>
  );
}