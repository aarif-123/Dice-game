package com.dicegame.dto;

public class RollDiceRequest {
    private String playerName;
    
    public RollDiceRequest() {}
    
    public RollDiceRequest(String playerName) {
        this.playerName = playerName;
    }
    
    public String getPlayerName() { return playerName; }
    public void setPlayerName(String playerName) { this.playerName = playerName; }
}