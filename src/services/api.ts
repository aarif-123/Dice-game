const API_BASE_URL = 'http://localhost:8080/api';

export interface StartGameRequest {
  mode: 'pvp' | 'pvc';
  rounds: number;
}

export interface RollDiceRequest {
  playerName: string;
}

export interface GameStateResponse {
  gameId: string;
  mode: string;
  maxRounds: number;
  currentRound: number;
  status: string;
  players: Array<{
    id: number;
    name: string;
    isComputer: boolean;
    score: number;
    roundWins: number;
  }>;
  currentRoundRolls: Array<{
    playerName: string;
    value: number;
    timestamp: string;
  }>;
  gameComplete: boolean;
  roundComplete: boolean;
}

export interface DiceRollResponse {
  playerName: string;
  value: number;
  timestamp: string;
  gameState: GameStateResponse;
}

export interface GameResultResponse {
  gameId: string;
  winner: {
    name: string;
    isComputer: boolean;
  } | null;
  totalRounds: number;
  finalScores: number[];
  timestamp: string;
  isDraw: boolean;
}

export interface PlayerStats {
  id: number;
  name: string;
  totalGames: number;
  totalWins: number;
  winRate: number;
  lastPlayed: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async startGame(request: StartGameRequest): Promise<GameStateResponse> {
    return this.request<GameStateResponse>('/game/start', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getGameState(gameId: string): Promise<GameStateResponse> {
    return this.request<GameStateResponse>(`/game/${gameId}/state`);
  }

  async rollDice(gameId: string, playerName: string): Promise<DiceRollResponse> {
    return this.request<DiceRollResponse>(`/game/${gameId}/roll`, {
      method: 'POST',
      body: JSON.stringify({ playerName }),
    });
  }

  async nextRound(gameId: string): Promise<GameStateResponse> {
    return this.request<GameStateResponse>(`/game/${gameId}/next-round`, {
      method: 'POST',
    });
  }

  async endGame(gameId: string): Promise<GameResultResponse> {
    return this.request<GameResultResponse>(`/game/${gameId}/end`, {
      method: 'POST',
    });
  }

  async getLeaderboard(): Promise<PlayerStats[]> {
    return this.request<PlayerStats[]>('/game/leaderboard');
  }

  async deleteGame(gameId: string): Promise<void> {
    await this.request<void>(`/game/${gameId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();