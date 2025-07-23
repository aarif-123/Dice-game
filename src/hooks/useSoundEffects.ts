import { useCallback } from 'react';

export function useSoundEffects() {
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.type = type;

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      // Silently fail if Web Audio API is not supported
    }
  }, []);

  const playRollSound = useCallback(() => {
    // Simulate dice rolling sound with multiple tones
    setTimeout(() => playSound(400, 0.1, 'square'), 0);
    setTimeout(() => playSound(350, 0.1, 'square'), 100);
    setTimeout(() => playSound(300, 0.1, 'square'), 200);
    setTimeout(() => playSound(450, 0.2, 'sine'), 300);
  }, [playSound]);

  const playClickSound = useCallback(() => {
    playSound(800, 0.1, 'square');
  }, [playSound]);

  const playWinSound = useCallback(() => {
    // Victory fanfare
    setTimeout(() => playSound(523, 0.2, 'sine'), 0);   // C
    setTimeout(() => playSound(659, 0.2, 'sine'), 200); // E
    setTimeout(() => playSound(784, 0.3, 'sine'), 400); // G
  }, [playSound]);

  return {
    playRollSound,
    playClickSound,
    playWinSound
  };
}