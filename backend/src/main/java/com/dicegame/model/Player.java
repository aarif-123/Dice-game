package com.dicegame.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private boolean isComputer;
    
    @Column(nullable = false)
    private int score;
    
    @Column(nullable = false)
    private int roundWins;
    
    @Column(nullable = false)
    private int totalGames;
    
    @Column(nullable = false)
    private int totalWins;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "last_played")
    private LocalDateTime lastPlayed;
    
    public Player() {
        this.score = 0;
        this.roundWins = 0;
        this.totalGames = 0;
        this.totalWins = 0;
        this.createdAt = LocalDateTime.now();
        this.lastPlayed = LocalDateTime.now();
    }
    
    public Player(String name, boolean isComputer) {
        this();
        this.name = name;
        this.isComputer = isComputer;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public boolean isComputer() { return isComputer; }
    public void setComputer(boolean computer) { isComputer = computer; }
    
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    
    public int getRoundWins() { return roundWins; }
    public void setRoundWins(int roundWins) { this.roundWins = roundWins; }
    
    public int getTotalGames() { return totalGames; }
    public void setTotalGames(int totalGames) { this.totalGames = totalGames; }
    
    public int getTotalWins() { return totalWins; }
    public void setTotalWins(int totalWins) { this.totalWins = totalWins; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getLastPlayed() { return lastPlayed; }
    public void setLastPlayed(LocalDateTime lastPlayed) { this.lastPlayed = lastPlayed; }
    
    public void addScore(int points) {
        this.score += points;
    }
    
    public void incrementRoundWins() {
        this.roundWins++;
    }
    
    public void incrementTotalGames() {
        this.totalGames++;
        this.lastPlayed = LocalDateTime.now();
    }
    
    public void incrementTotalWins() {
        this.totalWins++;
    }
    
    public double getWinRate() {
        return totalGames > 0 ? (double) totalWins / totalGames : 0.0;
    }
    
    public void resetGameStats() {
        this.score = 0;
        this.roundWins = 0;
    }
    
    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", isComputer=" + isComputer +
                ", score=" + score +
                ", roundWins=" + roundWins +
                ", totalWins=" + totalWins +
                ", totalGames=" + totalGames +
                '}';
    }
}