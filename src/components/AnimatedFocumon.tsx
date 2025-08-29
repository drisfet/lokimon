
'use client';

import { motion } from 'framer-motion';

const idleAnimation = {
  scaleY: [1, 1.05, 1],
  translateY: ['0px', '-5px', '0px'],
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const walkingAnimation = {
    scaleY: [1.0, 0.95, 1.0],
    translateY: ['0px', '2px', '0px'],
    transition: {
        duration: 0.5,
        repeat: Infinity,
        ease: "easeInOut",
    },
}

export const AnimatedFocumon = ({ isMoving }: { isMoving: boolean }) => {
  return (
    <motion.div 
        className="w-full h-full"
        animate={isMoving ? walkingAnimation : idleAnimation}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: 'hsl(var(--accent-foreground))', stopOpacity:1}} />
          </radialGradient>
        </defs>
        
        {/* Body */}
        <motion.ellipse
          cx="50"
          cy="65"
          rx="35"
          ry="30"
          fill="url(#grad1)"
        />

        {/* Eyes */}
        <circle cx="38" cy="60" r="5" fill="black" />
        <circle cx="62" cy="60" r="5" fill="black" />
        <circle cx="37" cy="59" r="1.5" fill="white" />
        <circle cx="61" cy="59" r="1.5" fill="white" />

        {/* Ears */}
        <motion.path
          d="M 25 40 C 15 10, 40 10, 35 40 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth="2"
          animate={{ rotate: [0, -5, 0], transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
          style={{ transformOrigin: "25px 40px" }}
        />
        <motion.path
          d="M 75 40 C 85 10, 60 10, 65 40 Z"
          fill="hsl(var(--accent))"
          stroke="hsl(var(--accent-foreground))"
          strokeWidth="2"
          animate={{ rotate: [0, 5, 0], transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
          style={{ transformOrigin: "75px 40px" }}
        />
      </svg>
    </motion.div>
  );
};
