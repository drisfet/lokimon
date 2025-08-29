
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Rabbit } from 'lucide-react';

// Game constants
const GAME_WIDTH = 500;
const GAME_HEIGHT = 730;
const FOCUMON_SIZE = 40;
const GRAVITY = 0.4;
const JUMP_STRENGTH = 8;
const PIPE_WIDTH = 60;
const PIPE_GAP = 250;
const PIPE_SPEED = 3;

type GameState = 'waiting' | 'playing' | 'gameOver';

export default function FlappyFocumon({ isRunning }: { isRunning: boolean }) {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [focumonPosition, setFocumonPosition] = useState(GAME_HEIGHT / 2);
  const [focumonVelocity, setFocumonVelocity] = useState(0);
  const [pipes, setPipes] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [isAiControlled, setIsAiControlled] = useState(true);

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
      { x: GAME_WIDTH + GAME_WIDTH / 2 + 50, topHeight: Math.random() * (GAME_HEIGHT / 2) + 100 },
    ]);
    setIsAiControlled(true); // AI is in control on reset
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
    if (gameState !== 'playing') {
       if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
       return;
    };

    // AI Control Logic
    if (isAiControlled) {
      const nextPipe = pipes.find(p => p.x + PIPE_WIDTH > GAME_WIDTH / 4 - FOCUMON_SIZE / 2);
      if (nextPipe) {
        const pipeGapCenter = nextPipe.topHeight + PIPE_GAP / 2;
        // Add a small buffer to make it look smoother
        const safeZoneTop = pipeGapCenter - 30;

        // If Focumon is falling below the safe zone, jump!
        if (focumonPosition > safeZoneTop && focumonVelocity > 0) {
           setFocumonVelocity(-JUMP_STRENGTH);
        }
      }
    }


    // Focumon physics
    setFocumonVelocity(v => {
      const newVelocity = v + GRAVITY;
      setFocumonPosition(p => {
        const newPosition = p + newVelocity;
        
        // Collision with ground
        if (newPosition > GAME_HEIGHT - FOCUMON_SIZE) {
          setGameState('gameOver');
          return GAME_HEIGHT - FOCUMON_SIZE;
        }
        // Collision with ceiling
        if (newPosition < 0) {
          setFocumonVelocity(0);
          return 0;
        }

        return newPosition;
      });
      return newVelocity;
    });

    // Pipe logic
    let passedPipe = false;
    setPipes(currentPipes => {
        let newPipes = currentPipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
        
        // Check for collision
        const focumonRect = { x: GAME_WIDTH / 4, y: focumonPosition, width: FOCUMON_SIZE, height: FOCUMON_SIZE };
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
              passedPipe = true;
            }
        }

        if (passedPipe) {
          setScore(s => s + 1);
        }

        // Add new pipes and remove old ones
        if (newPipes.length > 0 && newPipes[0].x < -PIPE_WIDTH) {
            newPipes.shift();
            const lastPipe = newPipes[newPipes.length - 1];
            newPipes.push({ x: (lastPipe?.x || GAME_WIDTH) + GAME_WIDTH / 2 + 50, topHeight: Math.random() * (GAME_HEIGHT / 2) + 100 });
        }
        
        return newPipes;
    });

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };
  
  useEffect(() => {
    controls.start({ y: focumonPosition, transition: { duration: 0, ease: 'linear' } });
  }, [focumonPosition, controls]);

  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    } else {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState, isAiControlled]); // Rerun effect if AI control changes

  const handleTap = () => {
    // First tap by user takes control from AI
    if (isAiControlled) {
        setIsAiControlled(false);
    }

    if (gameState === 'playing') {
      setFocumonVelocity(-JUMP_STRENGTH);
    } else if (gameState === 'gameOver' && isRunning) {
      resetGame();
      setGameState('playing');
    } else if (gameState === 'waiting' && isRunning) {
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
            style={{
                left: 0,
                top: 0,
                width: PIPE_WIDTH,
                height: GAME_HEIGHT,
            }}
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

      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-headline text-5xl text-white text-stroke-black z-20">
        {score}
      </div>

       {isAiControlled && gameState === 'playing' && (
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 font-headline text-lg text-white z-20 bg-black/50 px-4 py-2 rounded-lg">
           AI is playing... Tap to take over!
         </div>
       )}

      {(!isRunning || (gameState === 'waiting' && isRunning)) && gameState !== 'gameOver' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
          <p className="font-headline text-2xl text-white text-center">
            {isRunning ? "Tap to Start" : "Start Focus to Play"}
          </p>
        </div>
      )}
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-30" onClick={handleTap}>
            <p className="font-headline text-4xl text-white">Game Over</p>
            <p className="font-headline text-xl text-white mt-4">Tap to Retry</p>
        </div>
      )}
    </div>
  );
}
