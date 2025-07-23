import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { DiceComponent } from './DiceComponent';
import { Scoreboard } from './Scoreboard';
import { GameControls } from './GameControls';
import { GameResult } from '../types/game';

interface GameScreenProps {
  onGameEnd: (result: GameResult) => void;
}

export function GameScreen({ onGameEnd }: GameScreenProps) {
  const { state, rollDice, nextRound, endGame } = useGame();
  const [activePlayer, setActivePlayer] = useState<0 | 1>(0);
  const [roundComplete, setRoundComplete] = useState(false);

  // Check if round is complete
  useEffect(() => {
    if (state.lastRolls[0] && state.lastRolls[1]) {
      setRoundComplete(true);
    } else {
      setRoundComplete(false);
    }
  }, [state.lastRolls]);

  // Check if game is complete
  useEffect(() => {
    if (state.currentRound >= state.maxRounds && roundComplete) {
      const result = endGame();
      onGameEnd(result);
    }
  }, [state.currentRound, state.maxRounds, roundComplete, endGame, onGameEnd]);

  const handleRoll = async (playerName?: string) => {
    if (state.isRolling) return;

    const currentPlayerName = playerName || state.players[activePlayer].name;
    await rollDice(currentPlayerName);

    // Switch to next player if current round isn't complete
    if (!state.lastRolls[1 - activePlayer]) {
      setActivePlayer(1 - activePlayer as 0 | 1);
    }
  };

  const handleNextRound = () => {
    nextRound();
    setActivePlayer(0);
    setRoundComplete(false);
  };

  // Auto-roll for computer player
  useEffect(() => {
    if (state.players[activePlayer].isComputer && !state.isRolling && !roundComplete) {
      const timer = setTimeout(() => {
        handleRoll();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activePlayer, state.players, state.isRolling, roundComplete]);

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
          Round {state.currentRound} of {state.maxRounds}
        </h1>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(state.currentRound - 1) / state.maxRounds * 100}%` }}
          />
        </div>
      </div>

      {/* Scoreboard */}
      <Scoreboard />

      {/* Game Area */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Player 1 */}
            <div className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              activePlayer === 0 && !roundComplete
                ? 'bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-500 shadow-lg'
                : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700'
            }`}>
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                {state.players[0].name}
              </h3>
              <DiceComponent
                value={state.lastRolls[0]?.value}
                isRolling={state.isRolling && activePlayer === 0}
                playerId={state.players[0].id}
              />
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Round Wins: {state.players[0].roundWins}
              </div>
            </div>

            {/* Player 2 */}
            <div className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              activePlayer === 1 && !roundComplete
                ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500 shadow-lg'
                : 'bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-700'
            }`}>
              <h3 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-200">
                {state.players[1].name}
              </h3>
              <DiceComponent
                value={state.lastRolls[1]?.value}
                isRolling={state.isRolling && activePlayer === 1}
                playerId={state.players[1].id}
              />
              <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Round Wins: {state.players[1].roundWins}
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <GameControls
            activePlayer={activePlayer}
            canRoll={!state.isRolling && !roundComplete}
            roundComplete={roundComplete}
            isGameComplete={state.currentRound > state.maxRounds}
            onRoll={handleRoll}
            onNextRound={handleNextRound}
          />
        </div>
      </div>
    </div>
  );
}
