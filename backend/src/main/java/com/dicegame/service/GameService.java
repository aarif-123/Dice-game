package com.dicegame.service;

import com.dicegame.dto.*;
import com.dicegame.model.GameEngine;
import com.dicegame.model.Player;
import com.dicegame.repository.PlayerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class GameService {
    
    @Autowired
    private PlayerRepository playerRepository;
    
    private final Map<String, GameEngine> activeGames = new ConcurrentHashMap<>();
    
    public GameStateDto startGame(StartGameRequest request) {
        String gameId = UUID.randomUUID().toString();
        
        GameEngine.GameMode mode = "pvc".equals(request.getMode()) ? 
            GameEngine.GameMode.PVC : GameEngine.GameMode.PVP;
        
        GameEngine game = new GameEngine(gameId, mode, request.getRounds());
        
        // Create players
        Player player1 = new Player("Player 1", false);
        Player player2 = new Player(
            mode == GameEngine.GameMode.PVC ? "Computer" : "Player 2", 
            mode == GameEngine.GameMode.PVC
        );
        
        game.addPlayer(player1);
        game.addPlayer(player2);
        
        activeGames.put(gameId, game);
        
        return convertToGameStateDto(game);
    }
    
    public DiceRollResponse rollDice(String gameId, String playerName) {
        GameEngine game = activeGames.get(gameId);
        if (game == null) {
            throw new IllegalArgumentException("Game not found");
        }
        
        GameEngine.DiceRoll roll = game.rollDice(playerName);
        
        DiceRollResponse response = new DiceRollResponse();
        response.setPlayerName(roll.getPlayerName());
        response.setValue(roll.getValue());
        response.setTimestamp(roll.getTimestamp());
        response.setGameState(convertToGameStateDto(game));
        
        return response;
    }
    
    public GameStateDto nextRound(String gameId) {
        GameEngine game = activeGames.get(gameId);
        if (game == null) {
            throw new IllegalArgumentException("Game not found");
        }
        
        game.nextRound();
        return convertToGameStateDto(game);
    }
    
    public GameStateDto getGameState(String gameId) {
        GameEngine game = activeGames.get(gameId);
        if (game == null) {
            throw new IllegalArgumentException("Game not found");
        }
        
        return convertToGameStateDto(game);
    }
    
    public GameResultDto endGame(String gameId) {
        GameEngine game = activeGames.get(gameId);
        if (game == null) {
            throw new IllegalArgumentException("Game not found");
        }
        
        // Save players to database
        for (Player player : game.getPlayers()) {
            if (!player.isComputer()) {
                Optional<Player> existingPlayer = playerRepository.findByName(player.getName());
                if (existingPlayer.isPresent()) {
                    Player existing = existingPlayer.get();
                    existing.setTotalGames(existing.getTotalGames() + 1);
                    existing.setLastPlayed(LocalDateTime.now());
                    if (player.equals(game.getGameWinner())) {
                        existing.setTotalWins(existing.getTotalWins() + 1);
                    }
                    playerRepository.save(existing);
                } else {
                    playerRepository.save(player);
                }
            }
        }
        
        GameResultDto result = new GameResultDto();
        result.setGameId(gameId);
        result.setWinner(game.getGameWinner());
        result.setTotalRounds(game.getCurrentRound() - 1);
        result.setFinalScores(game.getPlayers().stream()
            .mapToInt(Player::getScore)
            .toArray());
        result.setTimestamp(LocalDateTime.now());
        result.setDraw(game.getGameWinner() == null);
        
        // Remove game from active games
        activeGames.remove(gameId);
        
        return result;
    }
    
    public List<PlayerStatsDto> getLeaderboard() {
        List<Player> players = playerRepository.findTop10ByOrderByTotalWinsDesc();
        return players.stream()
            .map(this::convertToPlayerStatsDto)
            .collect(Collectors.toList());
    }
    
    public void deleteGame(String gameId) {
        activeGames.remove(gameId);
    }
    
    private GameStateDto convertToGameStateDto(GameEngine game) {
        GameStateDto dto = new GameStateDto();
        dto.setGameId(game.getGameId());
        dto.setMode(game.getMode().name().toLowerCase());
        dto.setMaxRounds(game.getMaxRounds());
        dto.setCurrentRound(game.getCurrentRound());
        dto.setStatus(game.getStatus().name().toLowerCase());
        dto.setPlayers(game.getPlayers());
        dto.setCurrentRoundRolls(game.getCurrentRoundRolls());
        dto.setGameComplete(game.isGameComplete());
        dto.setRoundComplete(game.isRoundComplete());
        return dto;
    }
    
    private PlayerStatsDto convertToPlayerStatsDto(Player player) {
        PlayerStatsDto dto = new PlayerStatsDto();
        dto.setId(player.getId());
        dto.setName(player.getName());
        dto.setTotalGames(player.getTotalGames());
        dto.setTotalWins(player.getTotalWins());
        dto.setWinRate(player.getWinRate());
        dto.setLastPlayed(player.getLastPlayed());
        return dto;
    }
}