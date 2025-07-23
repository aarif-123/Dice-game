import React, { useState, useCallback } from 'react';
import { GameScreen } from './components/GameScreen';
import { StartScreen } from './components/StartScreen';
import { ResultModal } from './components/ResultModal';
import { ThemeProvider } from './contexts/ThemeContext';
import { GameProvider } from './contexts/GameContext';
import { GameMode, GameResult } from './types/game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'game'>('start');
  const [gameResult, setGameResult] = useState<GameResult | null>(null);

  const handleStartGame = useCallback(async (mode: GameMode, rounds: number) => {
    setCurrentScreen('game');
  }, []);

  const handleGameEnd = useCallback((result: GameResult) => {
    setGameResult(result);
  }, []);

  const handlePlayAgain = useCallback(() => {
    setGameResult(null);
    setCurrentScreen('start');
  }, []);

  const handleCloseResult = useCallback(() => {
    setGameResult(null);
  }, []);

  return (
    <ThemeProvider>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
          {currentScreen === 'start' && (
            <StartScreen onStartGame={handleStartGame} />
          )}
          {currentScreen === 'game' && (
            <GameScreen onGameEnd={handleGameEnd} />
          )}
          {gameResult && (
            <ResultModal
              result={gameResult}
              onPlayAgain={handlePlayAgain}
              onClose={handleCloseResult}
            />
          )}
        </div>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;