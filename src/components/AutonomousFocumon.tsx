
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Stage, Sprite, useTick } from '@pixi/react';
import { BlurFilter } from 'pixi.js';

const STAGE_WIDTH = 500;
const STAGE_HEIGHT = 500;

interface Motion {
  x: number;
  y: number;
}

const FocumonCharacter = ({ isRunning }: { isRunning: boolean }) => {
  const [motion, setMotion] = useState<Motion>({ x: 0, y: 0 });
  const [target, setTarget] = useState<Motion>({ x: STAGE_WIDTH / 2, y: STAGE_HEIGHT / 2 });
  const [position, setPosition] = useState<Motion>({ x: STAGE_WIDTH / 2, y: STAGE_HEIGHT / 2 });
  const iter = useRef(0);

  useTick((delta) => {
    if (!isRunning) return;

    iter.current += delta;

    // Change target position every ~3 seconds
    if (iter.current > 180) {
      setTarget({
        x: Math.random() * STAGE_WIDTH,
        y: Math.random() * STAGE_HEIGHT,
      });
      iter.current = 0;
    }

    // Move towards target
    const dx = target.x - position.x;
    const dy = target.y - position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 1) {
      const speed = 0.5;
      const moveX = (dx / distance) * speed * delta;
      const moveY = (dy / distance) * speed * delta;
      
      setPosition(prev => ({
        x: prev.x + moveX,
        y: prev.y + moveY
      }));
      setMotion({x: moveX, y: moveY})
    }
  });

  return (
    <Sprite
      image="https://picsum.photos/100/100"
      data-ai-hint="cute monster"
      x={position.x}
      y={position.y}
      anchor={{ x: 0.5, y: 0.5 }}
      scale={{x: motion.x > 0 ? 1 : -1, y: 1}}
    />
  );
};

export default function AutonomousFocumon({ isRunning }: { isRunning: boolean }) {
  const blurFilter = new BlurFilter(4);

  return (
    <div
      className="relative w-full h-full bg-primary/20 overflow-hidden"
       style={{
        width: `${STAGE_WIDTH}px`,
        height: `${STAGE_HEIGHT}px`,
        maxWidth: '100%',
        maxHeight: '100%',
        aspectRatio: `${STAGE_WIDTH}/${STAGE_HEIGHT}`
      }}
    >
      <Stage
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        options={{ backgroundAlpha: 0 }}
      >
        <FocumonCharacter isRunning={isRunning} />
      </Stage>
       { !isRunning && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-30">
          <p className="font-headline text-2xl text-white text-center">
            Start Focus to Activate
          </p>
        </div>
      )}
    </div>
  );
}
