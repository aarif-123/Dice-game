# Dice Duel Backend

A Spring Boot REST API for the Dice Duel Simulator game.

## Features

- RESTful API for game management
- In-memory H2 database for player statistics
- Real-time game state management
- Player vs Player and Player vs Computer modes
- Leaderboard functionality
- CORS enabled for frontend integration

## API Endpoints

### Game Management
- `POST /api/game/start` - Start a new game
- `GET /api/game/{gameId}/state` - Get current game state
- `POST /api/game/{gameId}/roll` - Roll dice for a player
- `POST /api/game/{gameId}/next-round` - Proceed to next round
- `POST /api/game/{gameId}/end` - End the game
- `DELETE /api/game/{gameId}` - Delete a game

### Statistics
- `GET /api/game/leaderboard` - Get top 10 players

## Running the Application

1. Make sure you have Java 17+ installed
2. Navigate to the backend directory
3. Run: `./mvnw spring-boot:run`
4. The API will be available at `http://localhost:8080`

## Database

The application uses H2 in-memory database. You can access the H2 console at:
`http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:dicegame`
- Username: `sa`
- Password: (empty)

## Development

The application is configured for development with:
- Hot reload enabled
- SQL logging enabled
- CORS configured for frontend at `http://localhost:5173`