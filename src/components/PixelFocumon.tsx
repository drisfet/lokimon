
'use client';

import { Application, Container, Graphics, useTick } from '@pixi/react';
import { useCallback, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';

const width = 300;
const height = 300;

const FocumonCharacter = () => {
    const [rotation, setRotation] = useState(0);
    const graphicsRef = useRef<PIXI.Graphics>(null);

    useTick((delta) => {
        setRotation((r) => r + 0.01 * delta);
    });

    const draw = useCallback((g: PIXI.Graphics) => {
        g.clear();
        g.beginFill(0x9966FF, 1); // A purple color
        g.drawRect(-25, -25, 50, 50); // Draw a square
        g.endFill();

        // Eyes
        g.beginFill(0xffffff, 1);
        g.drawCircle(-10, -10, 5);
        g.drawCircle(10, -10, 5);
        g.endFill();
    }, []);

    return (
        <Container x={width / 2} y={height / 2} rotation={rotation}>
            <Graphics ref={graphicsRef} draw={draw} />
        </Container>
    );
};


export default function PixelFocumon() {
    return (
        <div className="relative aspect-square w-full max-w-sm bg-zinc-800 overflow-hidden border-4 border-zinc-700 shadow-inner">
             <Application
                width={width}
                height={height}
                options={{ backgroundAlpha: 0 }}
             >
                <FocumonCharacter />
            </Application>
        </div>
    )
}
