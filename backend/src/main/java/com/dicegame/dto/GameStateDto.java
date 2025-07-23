package com.dicegame.dto;

import com.dicegame.model.GameEngine;
import com.dicegame.model.Player;

import java.util.List;

public class GameStateDto {
    private String gameId;
    private String mode;
    private int maxRounds;
    private int currentRound;
    private String status;
    private List<Player> players;
    private List<GameEngine.DiceRoll> currentRoundRolls;
    private boolean gameComplete;
    private boolean roundComplete;
    
    // Getters and Setters
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    
    public int getMaxRounds() { return maxRounds; }
    public void setMaxRounds(int maxRounds) { this.maxRounds = maxRounds; }
    
    public int getCurrentRound() { return currentRound; }
    public void setCurrentRound(int currentRound) { this.currentRound = currentRound; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public List<Player> getPlayers() { return players; }
    public void setPlayers(List<Player> players) { this.players = players; }
    
    public List<GameEngine.DiceRoll> getCurrentRoundRolls() { return currentRoundRolls; }
    public void setCurrentRoundRolls(List<GameEngine.DiceRoll> currentRoundRolls) { 
        this.currentRoundRolls = currentRoundRolls; 
    }
    
    public boolean isGameComplete() { return gameComplete; }
    public void setGameComplete(boolean gameComplete) { this.gameComplete = gameComplete; }
    
    public boolean isRoundComplete() { return roundComplete; }
    public void setRoundComplete(boolean roundComplete) { this.roundComplete = roundComplete; }
}