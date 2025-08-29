
import * as PIXI from 'pixi.js';
import { PixiComponent } from '@pixi/react';

// Make PixiComponent constructor available
interface PixiComponent<P extends {}, C extends PIXI.DisplayObject> {
    new (props: P): C;
}

declare module '@pixi/react' {
    interface PixiElements {
        container: typeof PIXI.Container;
        graphics: typeof PIXI.Graphics;
    }
}
