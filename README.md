# Focumon Focus

This is a Next.js application that creates a gamified focus experience called "Focumon Focus". It's built using Next.js, React, Tailwind CSS, and Genkit for AI-powered features.

## AI-Powered Features

*   **Focumon Generation**: A "Designer" page (`/designer`) uses Google's Gemini model via Genkit to generate new Focumon, including their name, description, personality, and even suggested animations.
*   **Dynamic Storytelling**: During a focus session, an AI flow can generate events, like a new plant growing, to create a more dynamic and engaging environment.
*   **Generative UI**: The AI can directly influence the behavior of UI components, such as defining a Focumon's idle animation or having an AI agent play a minigame.

## Using PixiJS for High-Fidelity Graphics

To achieve high-fidelity, game-like graphics and animations, this project uses `pixi.js` with the `@pixi/react` library. This allows for powerful, hardware-accelerated 2D rendering directly within our React components.

**Important**: Ensure you use compatible versions of `pixi.js` and `@pixi/react`. The current stable combination for this project is:
- `pixi.js`: `8.1.5`
- `@pixi/react`: `7.1.2`

### Core Concepts

1.  **The `<Application />` Component**: As per the official `@pixi/react` documentation, the root of any Pixi scene is the `<Application />` component. This component creates the main canvas element and provides the context for all other Pixi elements.

    ```tsx
    // src/components/PixelFocumon.tsx

    import { Application } from '@pixi/react';

    export default function PixelFocumon() {
        return (
            <div className="...">
                 <Application options={{ backgroundAlpha: 0, width: 300, height: 300 }}>
                    {/* Your Pixi components go here */}
                </Application>
            </div>
        )
    }
    ```

2.  **Drawing with `<Graphics />`**: The `<Graphics />` component allows you to draw shapes, lines, and fills programmatically. You provide it a `draw` function, which receives a `PIXI.Graphics` instance to draw on.

    ```tsx
    // Inside a component rendered within <Application />

    import { Graphics } from '@pixi/react';
    import * as PIXI from 'pixi.js';
    import { useCallback } from 'react';

    const draw = useCallback((g: PIXI.Graphics) => {
        g.clear();
        g.beginFill(0x9966FF);
        g.drawRect(-25, -25, 50, 50); // Draw a 50x50 square
        g.endFill();
    }, []);

    return <Graphics draw={draw} />;
    ```

3.  **Animation with `useTick`**: For smooth, game-like animations, `@pixi/react` provides the `useTick` hook. This hook registers a function to be called on every frame of the Pixi application's ticker. It's the ideal place to update state variables that control position, rotation, scale, etc.

    ```tsx
    // Inside a component rendered within <Application />

    import { useTick } from '@pixi/react';
    import { useState } from 'react';

    const [rotation, setRotation] = useState(0);

    // This will run on every frame
    useTick((delta) => {
        // `delta` is the time elapsed since the last frame, useful for framerate-independent animation
        setRotation((currentRotation) => currentRotation + 0.01 * delta);
    });

    // You can then use the `rotation` state on a <Container /> or other component
    return <Container rotation={rotation}>...</Container>
    ```

### Best Practices in This Project

*   **Encapsulate Logic**: Create separate components for distinct visual elements (e.g., `FocumonCharacter`, `Environment`).
*   **Use `useCallback` for Drawing**: Wrap your `draw` functions in `useCallback` to prevent them from being recreated on every render, which improves performance.
*   **Animate with State**: Drive animations by updating state variables within the `useTick` hook, and pass those state variables as props to your Pixi components (`<Container rotation={rotation} />`). This keeps your animations declarative and in sync with React's rendering lifecycle.
