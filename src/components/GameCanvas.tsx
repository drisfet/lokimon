import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from '../game/main';
import { EventBus } from '../game/EventBus';

export interface IRefGameCanvas
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}

interface GameCanvasProps
{
    className?: string;
    style?: React.CSSProperties;
    currentActiveScene?: (scene_instance: Phaser.Scene) => void;
}

export const GameCanvas = forwardRef<IRefGameCanvas, GameCanvasProps>(function GameCanvas({ 
    className = "", 
    style = {}, 
    currentActiveScene 
}, ref) {
    const game = useRef<Phaser.Game | null>(null!);

    useLayoutEffect(() => {
        if (game.current === null) {
            game.current = StartGame("game-canvas-container");

            if (typeof ref === 'function') {
                ref({ game: game.current, scene: null });
            } else if (ref) {
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {
            if (game.current) {
                game.current.destroy(true);
                if (game.current !== null) {
                    game.current = null;
                }
            }
        }
    }, [ref]);

    useEffect(() => {
        EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
            if (currentActiveScene && typeof currentActiveScene === 'function') {
                currentActiveScene(scene_instance);
            }

            if (typeof ref === 'function') {
                ref({ game: game.current, scene: scene_instance });
            } else if (ref) {
                ref.current = { game: game.current, scene: scene_instance };
            }
        });
        
        return () => {
            EventBus.removeListener('current-scene-ready');
        }
    }, [currentActiveScene, ref]);

    return (
        <div
            id="game-canvas-container"
            className={className}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                ...style
            }}
        >
            <style jsx global>{`
                #game-canvas-container,
                #game-canvas-container *,
                #game-canvas-container canvas,
                #game-canvas-container div,
                #game-canvas-container div canvas,
                #game-canvas-container div div,
                #game-canvas-container div div canvas,
                #game-canvas-container div div div,
                #game-canvas-container div div div canvas {
                    width: 100% !important;
                    height: 100% !important;
                    max-width: none !important;
                    max-height: none !important;
                }
                #game-canvas-container canvas,
                #game-canvas-container div canvas,
                #game-canvas-container div div canvas,
                #game-canvas-container div div div canvas {
                    object-fit: contain !important;
                }
            `}</style>
        </div>
    );
});