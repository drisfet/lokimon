
'use client';

import { Application, extend } from '@pixi/react';
import { Container, Graphics, Sprite } from 'pixi.js';
import { BunnySprite } from './BunnySprite';

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

export default function PixiApp() {
  return (
    <div className="relative aspect-square w-full max-w-sm bg-zinc-800 overflow-hidden border-4 border-zinc-700 shadow-inner">
      {/* We'll wrap our components with an <Application> component
        // that provides the Pixi.js Application context */}
      <Application
        width={300}
        height={300}
        options={{ backgroundAlpha: 0 }}
      >
        <BunnySprite />
      </Application>
    </div>
  );
}
