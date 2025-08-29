
'use client';

import { Stage, Container, Graphics, useTick } from '@pixi/react';
import { useCallback, useState } from 'react';
import * as PIXI from 'pixi.js';

const width = 300;
const height = 300;

const FocumonCharacter = () => {
    const [rotation, setRotation] = useState(0);

    useTick((delta) => {
        setRotation((r) => r + 0.01 * delta);
    });

    const draw = useCallback((g: PIXI.Graphics) => {
        g.clear();
        g.beginFill(0xffc0cb, 1);
        g.drawCircle(0, 0, 50);
        g.endFill();
    }, []);

    return (
        <Container x={width / 2} y={height / 2} rotation={rotation}>
            <Graphics draw={draw} />
        </Container>
    );
};


export default function PixelFocumon() {
    return (
        <div className="relative aspect-square w-full max-w-sm bg-zinc-800 overflow-hidden border-4 border-zinc-700 shadow-inner">
            <Stage width={width} height={height} options={{ backgroundAlpha: 0 }}>
                <FocumonCharacter />
            </Stage>
        </div>
    )
}
