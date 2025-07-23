import React from 'react';
import { Trophy, RotateCcw, X, Crown } from 'lucide-react';
import { GameResult } from '../types/game';

interface ResultModalProps {
  result: GameResult;
  onPlayAgain: () => void;
  onClose: () => void;
}

export function ResultModal({ result, onPlayAgain, onClose }: ResultModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 p-8 max-w-md w-full mx-4 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
            {result.isDraw ? (
              <Trophy className="w-8 h-8 text-white" />
            ) : (
              <Crown className="w-8 h-8 text-white" />
            )}
          </div>
          
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {result.isDraw ? "It's a Draw!" : 'Game Over!'}
          </h2>
          
          {!result.isDraw && result.winner && (
            <p className="text-xl text-slate-600 dark:text-slate-400">
              🎉 {result.winner.name} Wins!
            </p>
          )}
        </div>

        {/* Game Stats */}
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 mb-8">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-4">Game Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Total Rounds:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{result.totalRounds}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Final Score:</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {result.finalScores[0]} - {result.finalScores[1]}
              </span>
            </div>
            
            {!result.isDraw && result.winner && (
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Winner:</span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {result.winner.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
}