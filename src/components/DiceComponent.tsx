import React from 'react';
import { DiceValue } from '../types/game';

interface DiceComponentProps {
  value?: DiceValue;
  isRolling: boolean;
  playerId: string;
}

export function DiceComponent({ value, isRolling, playerId }: DiceComponentProps) {
  const getDiceFace = (val?: DiceValue) => {
    if (!val) return null;
    
    const dotPositions = {
      1: [{ x: 50, y: 50 }],
      2: [{ x: 25, y: 25 }, { x: 75, y: 75 }],
      3: [{ x: 25, y: 25 }, { x: 50, y: 50 }, { x: 75, y: 75 }],
      4: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
      5: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 50, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }],
      6: [{ x: 25, y: 25 }, { x: 75, y: 25 }, { x: 25, y: 50 }, { x: 75, y: 50 }, { x: 25, y: 75 }, { x: 75, y: 75 }]
    };

    const dots = dotPositions[val];
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'
    ];

    return (
      <svg width="100%" height="100%" viewBox="0 0 100 100" className="dice-svg">
        {dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r="8"
            fill={colors[index % colors.length]}
            className="dice-dot"
            style={{
              animationDelay: `${index * 0.1}s`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}
          />
        ))}
      </svg>
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div 
        className={`dice-container w-28 h-28 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-slate-700 dark:via-slate-600 dark:to-slate-800 rounded-3xl shadow-2xl border-4 border-white dark:border-slate-500 flex items-center justify-center transition-all duration-300 transform-gpu ${
          isRolling 
            ? 'animate-dice-roll-3d shadow-3xl scale-125' 
            : value 
              ? 'shadow-xl hover:scale-110 hover:shadow-2xl animate-dice-settle' 
              : 'opacity-60 animate-pulse'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          background: isRolling 
            ? 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7, #DDA0DD)' 
            : undefined,
          backgroundSize: isRolling ? '400% 400%' : undefined,
          animation: isRolling 
            ? 'dice-roll-3d 2s cubic-bezier(0.68, -0.55, 0.265, 1.55), gradient-shift 2s ease-in-out' 
            : undefined
        }}
      >
        {isRolling ? (
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-spin-fast" />
            <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-ping opacity-75" />
            <div className="absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 animate-pulse opacity-50" />
          </div>
        ) : value ? (
          <div className="w-full h-full p-2">
            {getDiceFace(value)}
          </div>
        ) : (
          <div className="text-4xl text-gray-400 dark:text-gray-500 animate-bounce">
            ?
          </div>
        )}
      </div>
    </div>
  );
}