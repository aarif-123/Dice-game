package com.dicegame.controller;

import com.dicegame.dto.*;
import com.dicegame.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {
    
    @Autowired
    private GameService gameService;
    
    @PostMapping("/start")
    public ResponseEntity<GameStateDto> startGame(@RequestBody StartGameRequest request) {
        try {
            GameStateDto gameState = gameService.startGame(request);
            return ResponseEntity.ok(gameState);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{gameId}/roll")
    public ResponseEntity<DiceRollResponse> rollDice(
            @PathVariable String gameId,
            @RequestBody RollDiceRequest request) {
        try {
            DiceRollResponse response = gameService.rollDice(gameId, request.getPlayerName());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PostMapping("/{gameId}/next-round")
    public ResponseEntity<GameStateDto> nextRound(@PathVariable String gameId) {
        try {
            GameStateDto gameState = gameService.nextRound(gameId);
            return ResponseEntity.ok(gameState);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{gameId}/state")
    public ResponseEntity<GameStateDto> getGameState(@PathVariable String gameId) {
        try {
            GameStateDto gameState = gameService.getGameState(gameId);
            return ResponseEntity.ok(gameState);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/{gameId}/end")
    public ResponseEntity<GameResultDto> endGame(@PathVariable String gameId) {
        try {
            GameResultDto result = gameService.endGame(gameId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/leaderboard")
    public ResponseEntity<List<PlayerStatsDto>> getLeaderboard() {
        try {
            List<PlayerStatsDto> leaderboard = gameService.getLeaderboard();
            return ResponseEntity.ok(leaderboard);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @DeleteMapping("/{gameId}")
    public ResponseEntity<Void> deleteGame(@PathVariable String gameId) {
        try {
            gameService.deleteGame(gameId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}