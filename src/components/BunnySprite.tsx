
'use client';

import { Sprite, useTick } from '@pixi/react';
import { useState } from 'react';

const bunnyUrl = 'https://pixijs.io/examples/examples/assets/bunny.png';

export const BunnySprite = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotation, setRotation] = useState(0);

  useTick((delta) => {
    const i = x + 0.05 * delta;

    setRotation(rotation + 0.1 * delta);
    setX(i);
    setY(Math.sin(i) * 100);
  });

  return (
    <Sprite
      image={bunnyUrl}
      x={150} // center
      y={150} // center
      anchor={{ x: 0.5, y: 0.5 }}
      rotation={rotation}
    />
  );
};
