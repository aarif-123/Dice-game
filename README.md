# 🎲 Dice Duel Simulator

A visually stunning, interactive dice battle game built with React, TypeScript, and Java Spring Boot. Features beautiful 3D animations, colorful dice, sound effects, and both Player vs Player and Player vs Computer game modes.

![Dice Duel Simulator](https://img.shields.io/badge/Game-Dice%20Duel-blue?style=for-the-badge&logo=gamepad)
![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178C6?style=for-the-badge&logo=typescript)
![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-6DB33F?style=for-the-badge&logo=spring)

## 🎮 Game Features

### Core Gameplay
- **🎯 Two Game Modes**: Player vs Player or Player vs Computer
- **🎲 Animated Dice Rolling**: Beautiful 3D rotation effects with colorful dots
- **🏆 Score Tracking**: Real-time scoreboard with round wins and total scores
- **📊 Game History**: Track your last 5 games with win/loss records
- **🎵 Sound Effects**: Immersive audio feedback using Web Audio API

### Visual Features
- **🌈 Colorful Dice Dots**: Each dot uses vibrant colors (Red, Teal, Blue, Green, Yellow, Purple)
- **✨ 3D Animations**: Complex rotating dice with scaling and color-shifting effects
- **🌙 Dark/Light Mode**: Toggle between themes with smooth transitions
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **🎨 Modern UI**: Apple-level design aesthetics with gradients and micro-interactions

### Technical Features
- **⚡ Real-time Sync**: Backend integration with fallback to local gameplay
- **🔄 State Management**: React Context for game state and theme management
- **🎯 TypeScript**: Full type safety throughout the application
- **🚀 Performance**: GPU-accelerated animations and optimized rendering

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI Framework |
| TypeScript | 5.5.3 | Type Safety |
| Tailwind CSS | 3.4.1 | Styling |
| Vite | 5.4.2 | Build Tool |
| Lucide React | 0.344.0 | Icons |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17+ | Backend Language |
| Spring Boot | 3.2.0 | Web Framework |
| Spring Data JPA | 3.2.0 | Database Access |
| H2 Database | Runtime | In-Memory Database |
| Maven | 3.9+ | Build Tool |

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Java** 17+ and Maven
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dice-duel-simulator
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the backend server**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   Backend will run on `http://localhost:8080`

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

5. **Open your browser** and navigate to `http://localhost:5173`

## 🎯 How to Play

### Game Setup
1. **Choose Game Mode**:
   - **Player vs Player**: Two human players take turns
   - **Player vs Computer**: Challenge the AI opponent

2. **Select Rounds**: Choose between 3, 5, 7, or 10 rounds

3. **Start Playing**: Click "Start Game" to begin

### Gameplay
1. **Rolling Dice**: Click "Roll Dice" when it's your turn (or wait for computer)
2. **Scoring**: Higher dice value wins the round and gets a point
3. **Winning**: Player with most round wins after all rounds is the winner
4. **Draws**: If dice values are equal, the round is a draw

### Controls
- **🎲 Roll Dice**: Roll your dice when it's your turn
- **➡️ Next Round**: Proceed to the next round after both players roll
- **🏠 Back to Menu**: Return to start screen after game ends
- **🌙 Theme Toggle**: Switch between light and dark modes

## 🎨 Animation Details

### Dice Rolling Animation
- **3D Rotation**: Complex `rotateX`, `rotateY`, and `rotateZ` transformations
- **Scaling Effects**: Dynamic size changes during roll (1x → 1.3x → 1x)
- **Color Shifting**: Hue rotation and brightness changes
- **Duration**: 1.5-second animation with realistic physics easing
- **Gradient Background**: Animated color transitions during rolling

### Dice Dot Colors
| Dot Position | Color | Hex Code |
|--------------|-------|----------|
| 1st Dot | Red | #FF6B6B |
| 2nd Dot | Teal | #4ECDC4 |
| 3rd Dot | Blue | #45B7D1 |
| 4th Dot | Green | #96CEB4 |
| 5th Dot | Yellow | #FFEAA7 |
| 6th Dot | Purple | #DDA0DD |

## 🔧 API Endpoints

### Game Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/game/start` | Start a new game |
| GET | `/api/game/{gameId}/state` | Get current game state |
| POST | `/api/game/{gameId}/roll` | Roll dice for a player |
| POST | `/api/game/{gameId}/next-round` | Proceed to next round |
| POST | `/api/game/{gameId}/end` | End the game |
| DELETE | `/api/game/{gameId}` | Delete a game |

### Statistics
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/game/leaderboard` | Get top 10 players |

## 📁 Project Structure

```
dice-duel-simulator/
├── public/                     # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── DiceComponent.tsx  # Animated dice with colorful dots
│   │   ├── GameScreen.tsx     # Main game interface
│   │   ├── StartScreen.tsx    # Game setup screen
│   │   ├── Scoreboard.tsx     # Score tracking display
│   │   ├── GameControls.tsx   # Game action buttons
│   │   └── ResultModal.tsx    # Game result popup
│   ├── contexts/              # React contexts
│   │   ├── GameContext.tsx    # Game state management
│   │   └── ThemeContext.tsx   # Theme management
│   ├── hooks/                 # Custom React hooks
│   │   └── useSoundEffects.ts # Audio management
│   ├── services/              # API services
│   │   └── api.ts            # Backend communication
│   ├── types/                 # TypeScript definitions
│   │   └── game.ts           # Game-related types
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles and animations
│   └── main.tsx              # Application entry point
├── backend/                   # Java Spring Boot backend
│   ├── src/main/java/com/dicegame/
│   │   ├── controller/        # REST controllers
│   │   ├── service/          # Business logic
│   │   ├── model/            # JPA entities
│   │   ├── dto/              # Data transfer objects
│   │   └── repository/       # Data access layer
│   └── src/main/resources/
│       └── application.properties
├── package.json              # Frontend dependencies
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🎵 Sound Effects

The game includes immersive sound effects created using the Web Audio API:

- **🎲 Dice Roll**: Multi-tone sequence simulating dice rolling
- **🖱️ Button Click**: Sharp click feedback
- **🏆 Victory**: Triumphant fanfare sequence
- **🔇 Mute Option**: All sounds can be disabled

## 🌐 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🔧 Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
./mvnw spring-boot:run    # Start backend server
./mvnw clean compile      # Compile Java code
./mvnw test              # Run tests
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## 🐛 Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure Java 17+ is installed
   - Check if port 8080 is available
   - Verify backend server is running

2. **Frontend Build Errors**
   - Clear node_modules: `rm -rf node_modules && npm install`
   - Check Node.js version (18+ required)

3. **Animation Performance**
   - Enable hardware acceleration in browser
   - Close other resource-intensive applications

### Database Access

Access the H2 database console at `http://localhost:8080/h2-console`:
- **JDBC URL**: `jdbc:h2:mem:dicegame`
- **Username**: `sa`
- **Password**: (empty)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Spring Boot** for the robust backend framework
- **Lucide** for the beautiful icons
- **Web Audio API** for sound capabilities

---

<div align="center">

**🎲 Ready to Roll? Start Your Dice Duel Adventure! 🎲**

[Play Now](http://localhost:5173) | [Report Bug](issues) | [Request Feature](issues)

</div>
