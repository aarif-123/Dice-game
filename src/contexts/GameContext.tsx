import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, GameMode, Player, DiceRoll, GameResult, DiceValue } from '../types/game';
import { apiService } from '../services/api';

interface GameContextType {
  state: GameState;
  startGame: (mode: GameMode, rounds: number) => void;
  rollDice: (playerId: string) => Promise<DiceValue>;
  nextRound: () => void;
  endGame: () => GameResult;
  resetGame: () => void;
  gameId: string | null;
}

const initialState: GameState = {
  mode: 'pvp',
  maxRounds: 5,
  currentRound: 1,
  players: [
    { id: 'player1', name: 'Player 1', isComputer: false, score: 0, roundWins: 0 },
    { id: 'player2', name: 'Player 2', isComputer: false, score: 0, roundWins: 0 }
  ],
  isRolling: false,
  lastRolls: [null, null],
  gameHistory: []
};

type GameAction =
  | { type: 'START_GAME'; payload: { mode: GameMode; rounds: number } }
  | { type: 'SET_GAME_ID'; payload: string }
  | { type: 'UPDATE_FROM_BACKEND'; payload: any }
  | { type: 'SET_ROLLING'; payload: boolean }
  | { type: 'SET_DICE_ROLL'; payload: { playerIndex: 0 | 1; roll: DiceRoll } }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET_GAME' }
  | { type: 'ADD_TO_HISTORY'; payload: GameResult };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        mode: action.payload.mode,
        maxRounds: action.payload.rounds,
        currentRound: 1,
        players: [
          { ...state.players[0], score: 0, roundWins: 0 },
          { 
            ...state.players[1], 
            name: action.payload.mode === 'pvc' ? 'Computer' : 'Player 2',
            isComputer: action.payload.mode === 'pvc',
            score: 0, 
            roundWins: 0 
          }
        ],
        lastRolls: [null, null]
      };
    
    case 'SET_ROLLING':
      return { ...state, isRolling: action.payload };
    
    case 'SET_DICE_ROLL':
      const newLastRolls = [...state.lastRolls] as [DiceRoll | null, DiceRoll | null];
      newLastRolls[action.payload.playerIndex] = action.payload.roll;
      
      let newPlayers = [...state.players];
      newPlayers[action.payload.playerIndex] = {
        ...newPlayers[action.payload.playerIndex],
        score: newPlayers[action.payload.playerIndex].score + action.payload.roll.value
      };

      // Check if round is complete and determine winner
      if (newLastRolls[0] && newLastRolls[1]) {
        const player1Roll = newLastRolls[0].value;
        const player2Roll = newLastRolls[1].value;
        
        if (player1Roll > player2Roll) {
          newPlayers[0] = { ...newPlayers[0], roundWins: newPlayers[0].roundWins + 1 };
        } else if (player2Roll > player1Roll) {
          newPlayers[1] = { ...newPlayers[1], roundWins: newPlayers[1].roundWins + 1 };
        }
      }
      
      return {
        ...state,
        lastRolls: newLastRolls,
        players: newPlayers as [Player, Player]
      };
    
    case 'NEXT_ROUND':
      // Don't increment round if we've reached max rounds
      if (state.currentRound >= state.maxRounds) {
        return state;
      }
      return {
        ...state,
        currentRound: state.currentRound + 1,
        lastRolls: [null, null]
      };
    
    case 'ADD_TO_HISTORY':
      return {
        ...state,
        gameHistory: [action.payload, ...state.gameHistory.slice(0, 4)]
      };
    
    case 'RESET_GAME':
      return initialState;
    
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [gameId, setGameId] = React.useState<string | null>(null);

  const startGame = async (mode: GameMode, rounds: number) => {
    try {
      const response = await apiService.startGame({ mode, rounds });
      setGameId(response.gameId);
      dispatch({ type: 'UPDATE_FROM_BACKEND', payload: response });
    } catch (error) {
      console.error('Failed to start game:', error);
      // Fallback to local state
      dispatch({ type: 'START_GAME', payload: { mode, rounds } });
    }
  };

  const rollDice = async (playerName: string): Promise<DiceValue> => {
    dispatch({ type: 'SET_ROLLING', payload: true });
    
    try {
      if (gameId) {
        const response = await apiService.rollDice(gameId, playerName);
        dispatch({ type: 'UPDATE_FROM_BACKEND', payload: response.gameState });
        // Add a small delay to show the animation
        await new Promise(resolve => setTimeout(resolve, 500));
        dispatch({ type: 'SET_ROLLING', payload: false });
        return response.value as DiceValue;
      } else {
        // Fallback to local logic
        await new Promise(resolve => setTimeout(resolve, 1500));
        const value = (Math.floor(Math.random() * 6) + 1) as DiceValue;
        const playerIndex = state.players.findIndex(p => p.name === playerName) as 0 | 1;
        
        dispatch({
          type: 'SET_DICE_ROLL',
          payload: {
            playerIndex,
            roll: { playerId: playerName, value, timestamp: Date.now() }
          }
        });
        dispatch({ type: 'SET_ROLLING', payload: false });
        return value;
      }
    } catch (error) {
      console.error('Failed to roll dice:', error);
      dispatch({ type: 'SET_ROLLING', payload: false });
      throw error;
    }
  };

  const nextRound = async () => {
    try {
      if (gameId) {
        const response = await apiService.nextRound(gameId);
        dispatch({ type: 'UPDATE_FROM_BACKEND', payload: response });
      } else {
        dispatch({ type: 'NEXT_ROUND' });
      }
    } catch (error) {
      console.error('Failed to proceed to next round:', error);
      dispatch({ type: 'NEXT_ROUND' });
    }
  };

  const endGame = async (): Promise<GameResult> => {
    try {
      if (gameId) {
        const response = await apiService.endGame(gameId);
        const result: GameResult = {
          winner: response.winner ? {
            id: 'backend-player',
            name: response.winner.name,
            isComputer: response.winner.isComputer,
            score: 0,
            roundWins: 0
          } : null,
          totalRounds: response.totalRounds,
          finalScores: response.finalScores as [number, number],
          timestamp: Date.now(),
          isDraw: response.isDraw
        };
        
        dispatch({ type: 'ADD_TO_HISTORY', payload: result });
        return result;
      }
    } catch (error) {
      console.error('Failed to end game:', error);
    }
    
    // Fallback to local logic
    const [player1, player2] = state.players;
    const winner = player1.roundWins > player2.roundWins ? player1 :
                   player2.roundWins > player1.roundWins ? player2 : null;
    
    const result: GameResult = {
      winner,
      totalRounds: state.currentRound - 1,
      finalScores: [player1.score, player2.score],
      timestamp: Date.now(),
      isDraw: winner === null
    };
    
    dispatch({ type: 'ADD_TO_HISTORY', payload: result });
    return result;
  };

  const resetGame = () => {
    setGameId(null);
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <GameContext.Provider value={{
      state,
      startGame,
      rollDice,
      nextRound,
      endGame,
      resetGame,
      gameId
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
