# Focumon Focus

This is a Next.js application that creates a gamified focus experience called "Focumon Focus". It's built using Next.js, React, Tailwind CSS, and Genkit for AI-powered features.

## Current Features

*   **Focus Timer**: A core feature allowing users to start and stop focus sessions to track their productivity.
*   **Focumon Collection**: Users can discover and collect Focumon creatures as they complete more focus sessions.
*   **Dynamic Pages**: The app includes pages for a central portal, a Focumon library, a user party, a profile, and daily quests.
*   **AI-Powered Focumon Generation**: A "Designer" page (`/designer`) uses Google's Gemini model via Genkit to generate new Focumon, including their name, description, personality, and even suggested animations.

## Configuring AI-Driven UI Behavior

A key feature of this application is its implementation of a basic "Generative UI," where the AI can directly influence the behavior of the UI components. This creates a more dynamic and unpredictable experience for the user.

Here’s how it works:

1.  **AI Generates Behavior in a Flow**: The Genkit flow located at `src/ai/flows/generate-focumon-flow.ts` defines the structure of a generated Focumon. We've added an `animation` field to its output schema (`GeneratedFocumonSchema`). When called, the AI prompt instructs the model to provide a simple idle animation description (e.g., "Its tail wags slowly").

    ```typescript
    // in src/ai/flows/generate-focumon-flow.ts
    const GeneratedFocumonSchema = z.object({
      // ... other fields
      animation: z.string().describe('A brief description of a simple idle animation for the Focumon (e.g., "Tail wags slowly", "Blinks and looks around").'),
    });
    ```

2.  **UI Component Interprets the Behavior**: The React component responsible for rendering the Focumon, located at `src/components/Focumon.tsx`, reads this `animation` string. It contains simple logic to check for keywords in the description and apply a corresponding CSS class.

    ```tsx
    // in src/components/Focumon.tsx
    const FocumonCharacter = ({ ... }) => {
        // ...
        const animationClass = generatedFocumon?.animation?.includes("wag") ? "animate-wag" : "";
        return <Icon className={cn("w-48 h-48 ...", animationClass)} />
    }
    ```

3.  **CSS Defines the Animation**: The `animate-wag` class is defined in `src/app/globals.css` and applies a simple keyframe animation.

### How to Extend This Behavior

You can expand this functionality by:

*   **Adding more animations**: Define new CSS keyframe animations and their corresponding utility classes in `globals.css`.
*   **Expanding the AI's vocabulary**: Encourage the AI to use new keywords in its animation descriptions by updating the prompt in `generate-focumon-flow.ts`.
*   **Adding more complex logic in the component**: Modify `Focumon.tsx` to recognize more keywords or even interpret more complex instructions from the AI (e.g., combining multiple animations).

This model allows for a separation of concerns: the AI acts as a "designer" of behavior, and the UI components act as the "engine" that executes that design.
