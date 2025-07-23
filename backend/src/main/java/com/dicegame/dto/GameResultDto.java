package com.dicegame.dto;

import com.dicegame.model.Player;
import java.time.LocalDateTime;

public class GameResultDto {
    private String gameId;
    private Player winner;
    private int totalRounds;
    private int[] finalScores;
    private LocalDateTime timestamp;
    private boolean isDraw;
    
    // Getters and Setters
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public Player getWinner() { return winner; }
    public void setWinner(Player winner) { this.winner = winner; }
    
    public int getTotalRounds() { return totalRounds; }
    public void setTotalRounds(int totalRounds) { this.totalRounds = totalRounds; }
    
    public int[] getFinalScores() { return finalScores; }
    public void setFinalScores(int[] finalScores) { this.finalScores = finalScores; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    
    public boolean isDraw() { return isDraw; }
    public void setDraw(boolean draw) { isDraw = draw; }
}