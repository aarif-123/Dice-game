export type GameMode = 'pvp' | 'pvc';

export type DiceValue = 1 | 2 | 3 | 4 | 5 | 6;

export interface Player {
  id: string;
  name: string;
  isComputer: boolean;
  score: number;
  roundWins: number;
}

export interface DiceRoll {
  playerId: string;
  value: DiceValue;
  timestamp: number;
}

export interface GameState {
  mode: GameMode;
  maxRounds: number;
  currentRound: number;
  players: [Player, Player];
  isRolling: boolean;
  lastRolls: [DiceRoll | null, DiceRoll | null];
  gameHistory: GameResult[];
}

export interface GameResult {
  winner: Player | null;
  totalRounds: number;
  finalScores: [number, number];
  timestamp: number;
  isDraw: boolean;
}