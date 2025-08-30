import { useRef, useState, useEffect } from 'react';
import { IRefPhaserGame, PhaserGame } from './PhaserGame';
import { MainMenu } from './game/scenes/MainMenu';
import Link from 'next/link';

function App()
{
    // The sprite can only be moved in the MainMenu Scene
    const [canMoveSprite, setCanMoveSprite] = useState(true);

    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [spritePosition, setSpritePosition] = useState({ x: 0, y: 0 });

    const changeScene = () => {

        if(phaserRef.current)
        {
            const scene = phaserRef.current.scene as MainMenu;
            
            if (scene)
            {
                scene.changeScene();
            }
        }
    }

    const moveSprite = () => {

        if(phaserRef.current)
        {

            const scene = phaserRef.current.scene as MainMenu;

            if (scene && scene.scene.key === 'MainMenu')
            {
                // Get the update logo position
                scene.moveLogo(({ x, y }) => {

                    setSpritePosition({ x, y });

                });
            }
        }

    }

    const addSprite = () => {

        if (phaserRef.current)
        {
            const scene = phaserRef.current.scene;

            if (scene)
            {
                // Add more stars
                const x = Phaser.Math.Between(64, scene.scale.width - 64);
                const y = Phaser.Math.Between(64, scene.scale.height - 64);
    
                //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
                const star = scene.add.sprite(x, y, 'star');
    
                //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
                //  You could, of course, do this from within the Phaser Scene code, but this is just an example
                //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
                scene.add.tween({
                    targets: star,
                    duration: 500 + Math.random() * 1000,
                    alpha: 0,
                    yoyo: true,
                    repeat: -1
                });
            }
        }
    }

    const startGame = () => {
        // Navigate to the portal page
        window.location.href = '/portal';
    }

    // Event emitted from the PhaserGame component
    const currentScene = (scene: Phaser.Scene) => {

        setCanMoveSprite(scene.scene.key !== 'MainMenu');
        
    }

    // Listen for custom events from detached buttons
    useEffect(() => {
        const handleSceneChange = () => changeScene();
        const handleToggleMovement = () => moveSprite();
        const handleAddSprite = () => addSprite();

        window.addEventListener('change-scene', handleSceneChange);
        window.addEventListener('toggle-movement', handleToggleMovement);
        window.addEventListener('add-sprite', handleAddSprite);

        return () => {
            window.removeEventListener('change-scene', handleSceneChange);
            window.removeEventListener('toggle-movement', handleToggleMovement);
            window.removeEventListener('add-sprite', handleAddSprite);
        };
    }, []);

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
            <div className="spritePosition">Sprite Position:
                <pre>{`{\n  x: ${spritePosition.x}\n  y: ${spritePosition.y}\n}`}</pre>
            </div>
        </div>
    )
}

export default App
