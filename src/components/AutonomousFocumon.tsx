'use client';

import { motion, useAnimation, PanInfo } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatedFocumon } from './AnimatedFocumon';

const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 400;
const FOCUMON_SIZE = 60;
const FOOD_BOWL_SIZE = 40;
const INTERACTION_DISTANCE = 50;

// Custom hook to manage the wandering and interaction logic
function useWander(controls: any, isRunning: boolean, foodPosition: { x: number; y: number }) {
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
    const focumonPos = { x: controls.get('x'), y: controls.get('y') };
    const distance = Math.sqrt(
      Math.pow(focumonPos.x - foodPosition.x, 2) + Math.pow(focumonPos.y - foodPosition.y, 2)
    );

    if (distance < INTERACTION_DISTANCE) {
      setIsMoving(false);
      setIsInteracting(true);
      await controls.start({
        x: foodPosition.x,
        y: foodPosition.y + 10,
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
    const nextX = Math.random() * (CONTAINER_WIDTH - FOCUMON_SIZE);
    const currentX = controls.get('x');

    await controls.start({
      x: nextX,
      y: Math.random() * (CONTAINER_HEIGHT - FOCUMON_SIZE),
      scaleX: nextX > currentX ? 1 : -1,
      transition: {
        duration: Math.random() * 3 + 2,
        ease: 'easeInOut',
      },
    });

    setIsMoving(false);
    setTimeout(() => {
        if(isMountedRef.current) wander()
    }, Math.random() * 2000 + 1000);
  }, [controls, isRunning, foodPosition]);

  useEffect(() => {
    if (isRunning) {
      setTimeout(wander, 1000); // Start wandering after a delay
    } else {
      // When not running, stop all animations and center the Focumon
      controls.stop();
      setIsMoving(false);
      setIsInteracting(false);
      controls.start({
        x: (CONTAINER_WIDTH - FOCUMON_SIZE) / 2,
        y: (CONTAINER_HEIGHT - FOCUMON_SIZE) / 2,
        scaleX: 1,
        transition: { duration: 0.5 },
      });
    }

    return () => {
      controls.stop();
    };
  }, [isRunning, controls, wander]);

  return { isMoving, isInteracting };
}


const AutonomousFocumon = ({ isRunning }: { isRunning: boolean }) => {
  const controls = useAnimation();
  const [foodPosition] = useState({ 
      x: CONTAINER_WIDTH * 0.75, 
      y: CONTAINER_HEIGHT * 0.75 
  });
  const { isMoving, isInteracting } = useWander(controls, isRunning, foodPosition);


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
          left: foodPosition.x - FOOD_BOWL_SIZE / 2,
          top: foodPosition.y - FOOD_BOWL_SIZE / 2,
        }}
      >
         <div className="w-1/2 h-1/2 bg-accent/50 rounded-full"/>
      </motion.div>


      {/* The Focumon */}
      <motion.div
        animate={controls}
        initial={{
          x: (CONTAINER_WIDTH - FOCUMON_SIZE) / 2,
          y: (CONTAINER_HEIGHT - FOCUMON_SIZE) / 2,
        }}
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
