package com.dicegame.dto;

import java.time.LocalDateTime;

public class DiceRollResponse {
    private String playerName;
    private int value;
    private LocalDateTime timestamp;
    private GameStateDto gameState;
    
    // Getters and Setters
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
    
    public int getValue() { return value; }
    public void setValue(int value) { this.value = value; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public GameStateDto getGameState() { return gameState; }
    public void setGameState(GameStateDto gameState) { this.gameState = gameState; }
}