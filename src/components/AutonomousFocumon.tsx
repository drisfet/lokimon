
'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatedFocumon } from './AnimatedFocumon';

const CONTAINER_WIDTH = 350;
const CONTAINER_HEIGHT = 350;
const FOCUMON_SIZE = 60;
const FOOD_BOWL_SIZE = 40;
const INTERACTION_DISTANCE = 50;

// Custom hook to manage the wandering and interaction logic
function useWander(
  controls: any,
  isRunning: boolean,
  foodPosition: { x: number; y: number },
  positionRef: React.MutableRefObject<{ x: number; y: number }>
) {
  const [isMoving, setIsMoving] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const wander = useCallback(async () => {
    if (!isMountedRef.current || !isRunning) return;

    // Check for interaction
    const focumonPos = positionRef.current;
    const foodBowlCenter = { x: foodPosition.x + FOOD_BOWL_SIZE/2, y: foodPosition.y + FOOD_BOWL_SIZE/2 };
    const distance = Math.sqrt(
      Math.pow(focumonPos.x - foodBowlCenter.x, 2) + Math.pow(focumonPos.y - foodBowlCenter.y, 2)
    );

    if (distance < INTERACTION_DISTANCE) {
      setIsMoving(false);
      setIsInteracting(true);
      const targetPos = { x: foodPosition.x, y: foodPosition.y + 10 };
      positionRef.current = targetPos;
      await controls.start({
        ...targetPos,
        scaleX: focumonPos.x > foodPosition.x ? -1 : 1,
        transition: { duration: 1, ease: 'easeInOut' },
      });

      // Stay and "eat" for a bit
      setTimeout(() => {
        if (isMountedRef.current) {
            setIsInteracting(false);
            wander(); // Go back to wandering
        }
      }, 3000);
      return;
    }

    // If not interacting, just wander
    setIsMoving(true);
    const nextPos = {
      x: Math.random() * (CONTAINER_WIDTH - FOCUMON_SIZE),
      y: Math.random() * (CONTAINER_HEIGHT - FOCUMON_SIZE)
    };
    positionRef.current = nextPos;

    await controls.start({
      ...nextPos,
      scaleX: nextPos.x > focumonPos.x ? 1 : -1,
      transition: {
        duration: Math.random() * 3 + 2,
        ease: 'easeInOut',
      },
    });

    setIsMoving(false);
    setTimeout(() => {
        if(isMountedRef.current) wander()
    }, Math.random() * 2000 + 1000);
  }, [controls, isRunning, foodPosition, positionRef]);

  useEffect(() => {
    if (isRunning) {
      // Set timeout to ensure component is mounted before starting animation
      setTimeout(wander, 1000);
    } else {
      // When not running, stop all animations and center the Focumon
      controls.stop();
      setIsMoving(false);
      setIsInteracting(false);
      const centerPos = {
        x: (CONTAINER_WIDTH - FOCUMON_SIZE) / 2,
        y: (CONTAINER_HEIGHT - FOCUMON_SIZE) / 2,
      };
      positionRef.current = centerPos;
      controls.start({
        ...centerPos,
        scaleX: 1,
        transition: { duration: 0.5 },
      });
    }

    return () => {
      controls.stop();
    };
  }, [isRunning, controls, wander, positionRef]);

  return { isMoving, isInteracting };
}


const AutonomousFocumon = ({ isRunning }: { isRunning: boolean }) => {
  const controls = useAnimation();
  const [foodPosition] = useState({ 
      x: CONTAINER_WIDTH * 0.75, 
      y: CONTAINER_HEIGHT * 0.75 
  });
  const initialPosition = {
    x: (CONTAINER_WIDTH - FOCUMON_SIZE) / 2,
    y: (CONTAINER_HEIGHT - FOCUMON_SIZE) / 2,
  }
  const positionRef = useRef(initialPosition);
  const { isMoving, isInteracting } = useWander(controls, isRunning, foodPosition, positionRef);

  return (
    <div
      className="relative bg-primary/20 overflow-hidden rounded-lg shadow-inner"
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: `${CONTAINER_WIDTH}/${CONTAINER_HEIGHT}`,
      }}
    >
      {/* Environment Object: Food Bowl */}
      <motion.div
        className="absolute bg-zinc-700 rounded-full border-4 border-zinc-500 flex items-center justify-center"
        style={{
          width: FOOD_BOWL_SIZE,
          height: FOOD_BOWL_SIZE,
          left: foodPosition.x,
          top: foodPosition.y,
        }}
      >
         <div className="w-1/2 h-1/2 bg-accent/50 rounded-full"/>
      </motion.div>


      {/* The Focumon */}
      <motion.div
        animate={controls}
        initial={initialPosition}
        className="absolute"
        style={{ width: FOCUMON_SIZE, height: FOCUMON_SIZE }}
      >
        <AnimatedFocumon isMoving={isMoving || isInteracting} />
      </motion.div>
      
      {!isRunning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
          <p className="font-headline text-2xl text-white text-center">
            Start Focus to Activate
          </p>
        </div>
      )}
    </div>
  );
};

export default AutonomousFocumon;
