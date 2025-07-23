package com.dicegame.dto;

public class StartGameRequest {
    private String mode; // "pvp" or "pvc"
    private int rounds;
    
    public StartGameRequest() {}
    
    public StartGameRequest(String mode, int rounds) {
        this.mode = mode;
        this.rounds = rounds;
    }
    
    public String getMode() { return mode; }
    public void setMode(String mode) { this.mode = mode; }
    
    public int getRounds() { return rounds; }
    public void setRounds(int rounds) { this.rounds = rounds; }
}