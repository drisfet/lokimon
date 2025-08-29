'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedFocumon } from './AnimatedFocumon';

const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 400;
const FOCUMON_SIZE = 60;

const AutonomousFocumon = ({ isRunning }: { isRunning: boolean }) => {
  const controls = useAnimation();
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const wander = () => {
      if (!isMounted) return;
      setIsMoving(true);
      controls.start({
        x: Math.random() * (CONTAINER_WIDTH - FOCUMON_SIZE),
        y: Math.random() * (CONTAINER_HEIGHT - FOCUMON_SIZE),
        scaleX: Math.random() > 0.5 ? 1 : -1,
        transition: {
          duration: Math.random() * 3 + 2,
          ease: 'easeInOut',
        },
      }).then(() => {
        setIsMoving(false);
        if(isMounted) {
            setTimeout(() => {
                if (isMounted) wander();
            }, (Math.random() * 2000) + 1000); // Wait 1-3 seconds before wandering again
        }
      });
    };

    if (isRunning) {
      setTimeout(wander, 1000); // Start after a short delay
    } else {
      // When not running, stop all animations and center the Focumon
      controls.stop();
      setIsMoving(false);
      controls.start({
        x: (CONTAINER_WIDTH - FOCUMON_SIZE) / 2,
        y: (CONTAINER_HEIGHT - FOCUMON_SIZE) / 2,
        scaleX: 1,
        transition: { duration: 0.5 }
      });
    }
    
    return () => {
      isMounted = false;
      controls.stop();
    }
  }, [isRunning, controls]);

  return (
    <div
      className="relative bg-primary/20 overflow-hidden"
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: `${CONTAINER_WIDTH}/${CONTAINER_HEIGHT}`,
      }}
    >
      <motion.div
        animate={controls}
        initial={{
          x: (CONTAINER_WIDTH - FOCUMON_SIZE) / 2,
          y: (CONTAINER_HEIGHT - FOCUMON_SIZE) / 2,
        }}
        className="absolute"
        style={{ width: FOCUMON_SIZE, height: FOCUMON_SIZE }}
      >
        <AnimatedFocumon isMoving={isMoving} />
      </motion.div>
       { !isRunning && (
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
