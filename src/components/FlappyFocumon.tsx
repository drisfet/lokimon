
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Rabbit } from 'lucide-react';

// Game constants
const GAME_WIDTH = 500;
const GAME_HEIGHT = 730;
const FOCUMON_SIZE = 40;
const GRAVITY = 0.5;
const JUMP_STRENGTH = 10;
const PIPE_WIDTH = 60;
const PIPE_GAP = 200;
const PIPE_SPEED = 3;

type GameState = 'waiting' | 'playing' | 'gameOver';

export default function FlappyFocumon({ isRunning }: { isRunning: boolean }) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [focumonPosition, setFocumonPosition] = useState(GAME_HEIGHT / 2);
  const [focumonVelocity, setFocumonVelocity] = useState(0);
  const [pipes, setPipes] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  const gameLoopRef = useRef<number>();
  const controls = useAnimation();

  // Reset and initialize game
  const resetGame = () => {
    setGameState('waiting');
    setFocumonPosition(GAME_HEIGHT / 2);
    setFocumonVelocity(0);
    setScore(0);
    setPipes([
      { x: GAME_WIDTH, topHeight: Math.random() * (GAME_HEIGHT / 2) + 100 },
      { x: GAME_WIDTH + GAME_WIDTH / 2, topHeight: Math.random() * (GAME_HEIGHT / 2) + 100 },
    ]);
  };

  useEffect(() => {
    resetGame();
  }, []);

  useEffect(() => {
    if (isRunning && gameState === 'waiting') {
      setGameState('playing');
    }
    if (!isRunning && gameState === 'playing') {
      setGameState('waiting');
    }
  }, [isRunning, gameState]);

  const gameLoop = () => {
    if (gameState !== 'playing') return;

    // Focumon physics
    let newVelocity = focumonVelocity + GRAVITY;
    let newPosition = focumonPosition + newVelocity;
    
    // Collision with ground
    if (newPosition > GAME_HEIGHT - FOCUMON_SIZE) {
      newPosition = GAME_HEIGHT - FOCUMON_SIZE;
      setGameState('gameOver');
    }
    // Collision with ceiling
    if (newPosition < 0) {
      newPosition = 0;
      newVelocity = 0;
    }

    setFocumonVelocity(newVelocity);
    setFocumonPosition(newPosition);
    controls.start({ y: newPosition, transition: { duration: 0.05, ease: 'linear' } });


    // Pipe logic
    let newPipes = pipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
    let newScore = score;
    let passedPipe = false;

    // Check for collision with pipes
    const focumonRect = { x: GAME_WIDTH / 4, y: newPosition, width: FOCUMON_SIZE, height: FOCUMON_SIZE };
    for (const pipe of newPipes) {
        const topPipeRect = { x: pipe.x, y: 0, width: PIPE_WIDTH, height: pipe.topHeight };
        const bottomPipeRect = { x: pipe.x, y: pipe.topHeight + PIPE_GAP, width: PIPE_WIDTH, height: GAME_HEIGHT };

        const collides = (focumonRect.x < pipe.x + PIPE_WIDTH &&
                        focumonRect.x + focumonRect.width > pipe.x &&
                        (focumonRect.y < topPipeRect.height || focumonRect.y + focumonRect.height > bottomPipeRect.y));
        
        if (collides) {
            setGameState('gameOver');
            break;
        }

        // Score
        if (pipe.x + PIPE_WIDTH < focumonRect.x && !pipe.passed) {
          pipe.passed = true;
          newScore++;
          setScore(newScore);
        }
    }


    // Add new pipes and remove old ones
    if (newPipes[0] && newPipes[0].x < -PIPE_WIDTH) {
        newPipes.shift();
        const lastPipe = newPipes[newPipes.length - 1];
        newPipes.push({ x: lastPipe.x + GAME_WIDTH / 2 + 50, topHeight: Math.random() * (GAME_HEIGHT / 2) + 100 });
    }

    setPipes(newPipes);
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  }, [gameState]);

  const handleTap = () => {
    if (gameState === 'playing') {
      setFocumonVelocity(-JUMP_STRENGTH);
    } else if (gameState === 'gameOver' || gameState === 'waiting' && isRunning) {
      resetGame();
      setGameState('playing');
    }
  };

  return (
    <div
      className="relative w-full h-full bg-primary/20 overflow-hidden cursor-pointer"
      style={{
        width: `${GAME_WIDTH}px`,
        height: `${GAME_HEIGHT}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}`
      }}
      onClick={handleTap}
    >
      <motion.div
        className="absolute z-10"
        style={{
          width: FOCUMON_SIZE,
          height: FOCUMON_SIZE,
          left: `${GAME_WIDTH / 4 - FOCUMON_SIZE / 2}px`,
        }}
        initial={{ y: GAME_HEIGHT / 2 }}
        animate={controls}
      >
        <Rabbit className="w-full h-full text-accent drop-shadow-lg" />
      </motion.div>

      {pipes.map((pipe, i) => (
        <motion.div key={i} className="absolute"
            initial={{x: pipe.x}}
            animate={{x: pipe.x}}
            transition={{duration: 0.05, ease: 'linear'}}
        >
          <div
            className="absolute bg-green-500 border-2 border-green-700"
            style={{
              top: 0,
              width: PIPE_WIDTH,
              height: pipe.topHeight,
            }}
          />
          <div
            className="absolute bg-green-500 border-2 border-green-700"
            style={{
              top: pipe.topHeight + PIPE_GAP,
              width: PIPE_WIDTH,
              height: GAME_HEIGHT - (pipe.topHeight + PIPE_GAP),
            }}
          />
        </motion.div>
      ))}

      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-headline text-5xl text-white text-stroke-black">
        {score}
      </div>

      {(gameState === 'waiting' && isRunning) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <p className="font-headline text-2xl text-white text-center">Tap to Start</p>
        </div>
      )}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50" onClick={handleTap}>
            <p className="font-headline text-4xl text-white">Game Over</p>
            <p className="font-headline text-xl text-white mt-4">Tap to Retry</p>
        </div>
      )}
    </div>
  );
}
