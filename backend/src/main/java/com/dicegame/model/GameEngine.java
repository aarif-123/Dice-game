package com.dicegame.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class GameEngine {
    public enum GameMode {
        PVP, PVC
    }
    
    public enum GameStatus {
        WAITING, IN_PROGRESS, ROUND_COMPLETE, GAME_COMPLETE
    }
    
    private String gameId;
    private GameMode mode;
    private GameStatus status;
    private int maxRounds;
    private int currentRound;
    private List<Player> players;
    private List<DiceRoll> currentRoundRolls;
    private List<GameRound> gameHistory;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    
    public GameEngine() {
        this.players = new ArrayList<>();
        this.currentRoundRolls = new ArrayList<>();
        this.gameHistory = new ArrayList<>();
        this.status = GameStatus.WAITING;
        this.currentRound = 1;
    }
    
    public GameEngine(String gameId, GameMode mode, int maxRounds) {
        this();
        this.gameId = gameId;
        this.mode = mode;
        this.maxRounds = maxRounds;
        this.startTime = LocalDateTime.now();
    }
    
    public void addPlayer(Player player) {
        if (players.size() < 2) {
            players.add(player);
            if (players.size() == 2) {
                status = GameStatus.IN_PROGRESS;
            }
        } else {
            throw new IllegalStateException("Game already has maximum number of players");
        }
    }
    
    public DiceRoll rollDice(String playerName) {
        Player player = findPlayerByName(playerName);
        if (player == null) {
            throw new IllegalArgumentException("Player not found: " + playerName);
        }
        
        if (status != GameStatus.IN_PROGRESS) {
            throw new IllegalStateException("Game is not in progress");
        }
        
        // Check if player already rolled this round
        boolean alreadyRolled = currentRoundRolls.stream()
                .anyMatch(roll -> roll.getPlayerName().equals(playerName));
        
        if (alreadyRolled) {
            throw new IllegalStateException("Player has already rolled this round");
        }
        
        Dice dice = new Dice();
        int value = dice.roll();
        
        DiceRoll roll = new DiceRoll(playerName, value, LocalDateTime.now());
        currentRoundRolls.add(roll);
        player.addScore(value);
        
        // Check if round is complete
        if (currentRoundRolls.size() == 2) {
            completeRound();
        }
        
        return roll;
    }
    
    private void completeRound() {
        status = GameStatus.ROUND_COMPLETE;
        
        // Determine round winner
        DiceRoll roll1 = currentRoundRolls.get(0);
        DiceRoll roll2 = currentRoundRolls.get(1);
        
        Player winner = null;
        if (roll1.getValue() > roll2.getValue()) {
            winner = findPlayerByName(roll1.getPlayerName());
        } else if (roll2.getValue() > roll1.getValue()) {
            winner = findPlayerByName(roll2.getPlayerName());
        }
        
        if (winner != null) {
            winner.incrementRoundWins();
        }
        
        // Save round to history
        GameRound round = new GameRound(currentRound, new ArrayList<>(currentRoundRolls), winner);
        gameHistory.add(round);
        
        // Check if game is complete
        if (currentRound >= maxRounds) {
            completeGame();
        }
    }
    
    public void nextRound() {
        if (status != GameStatus.ROUND_COMPLETE) {
            throw new IllegalStateException("Current round is not complete");
        }
        
        currentRound++;
        currentRoundRolls.clear();
        
        if (currentRound <= maxRounds) {
            status = GameStatus.IN_PROGRESS;
        } else {
            completeGame();
        }
    }
    
    private void completeGame() {
        status = GameStatus.GAME_COMPLETE;
        endTime = LocalDateTime.now();
        
        // Update player statistics
        Player winner = getGameWinner();
        for (Player player : players) {
            player.incrementTotalGames();
            if (player.equals(winner)) {
                player.incrementTotalWins();
            }
        }
    }
    
    public Player getGameWinner() {
        if (players.size() != 2) return null;
        
        Player player1 = players.get(0);
        Player player2 = players.get(1);
        
        if (player1.getRoundWins() > player2.getRoundWins()) {
            return player1;
        } else if (player2.getRoundWins() > player1.getRoundWins()) {
            return player2;
        }
        
        return null; // Draw
    }
    
    public boolean isGameComplete() {
        return status == GameStatus.GAME_COMPLETE;
    }
    
    public boolean isRoundComplete() {
        return status == GameStatus.ROUND_COMPLETE;
    }
    
    private Player findPlayerByName(String name) {
        return players.stream()
                .filter(p -> p.getName().equals(name))
                .findFirst()
                .orElse(null);
    }
    
    public void resetGame() {
        currentRound = 1;
        currentRoundRolls.clear();
        gameHistory.clear();
        status = GameStatus.IN_PROGRESS;
        startTime = LocalDateTime.now();
        endTime = null;
        
        for (Player player : players) {
            player.resetGameStats();
        }
    }
    
    // Getters and Setters
    public String getGameId() { return gameId; }
    public void setGameId(String gameId) { this.gameId = gameId; }
    
    public GameMode getMode() { return mode; }
    public void setMode(GameMode mode) { this.mode = mode; }
    
    public GameStatus getStatus() { return status; }
    public void setStatus(GameStatus status) { this.status = status; }
    
    public int getMaxRounds() { return maxRounds; }
    public void setMaxRounds(int maxRounds) { this.maxRounds = maxRounds; }
    
    public int getCurrentRound() { return currentRound; }
    public void setCurrentRound(int currentRound) { this.currentRound = currentRound; }
    
    public List<Player> getPlayers() { return players; }
    public void setPlayers(List<Player> players) { this.players = players; }
    
    public List<DiceRoll> getCurrentRoundRolls() { return currentRoundRolls; }
    public void setCurrentRoundRolls(List<DiceRoll> currentRoundRolls) { this.currentRoundRolls = currentRoundRolls; }
    
    public List<GameRound> getGameHistory() { return gameHistory; }
    public void setGameHistory(List<GameRound> gameHistory) { this.gameHistory = gameHistory; }
    
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    
    // Helper classes
    public static class DiceRoll {
        private String playerName;
        private int value;
        private LocalDateTime timestamp;
        
        public DiceRoll(String playerName, int value, LocalDateTime timestamp) {
            this.playerName = playerName;
            this.value = value;
            this.timestamp = timestamp;
        }
        
        // Getters
        public String getPlayerName() { return playerName; }
        public int getValue() { return value; }
        public LocalDateTime getTimestamp() { return timestamp; }
    }
    
    public static class GameRound {
        private int roundNumber;
        private List<DiceRoll> rolls;
        private Player winner;
        
        public GameRound(int roundNumber, List<DiceRoll> rolls, Player winner) {
            this.roundNumber = roundNumber;
            this.rolls = rolls;
            this.winner = winner;
        }
        
        // Getters
        public int getRoundNumber() { return roundNumber; }
        public List<DiceRoll> getRolls() { return rolls; }
        public Player getWinner() { return winner; }
    }
}