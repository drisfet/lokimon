'use server';
/**
 * @fileOverview A flow for generating dynamic stories or events during a focus session.
 *
 * - generateFocusStory - A function that creates a new story event.
 * - GenerateFocusStoryInput - The input type for the function.
 * - GenerateFocusStoryOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const GenerateFocusStoryInputSchema = z.object({
  existingPlants: z.array(z.string()).describe('A list of plants already in the environment.'),
  sessionDuration: z.number().describe('The total duration of the focus session in seconds.'),
});
export type GenerateFocusStoryInput = z.infer<typeof GenerateFocusStoryInputSchema>;

export const GenerateFocusStoryOutputSchema = z.object({
  story: z.string().describe('A short, one-sentence narrative describing what is happening.'),
  plantName: z.string().describe('The name of a new plant that has started to grow.'),
  plantDescription: z.string().describe('A brief, whimsical description of the new plant.'),
});
export type GenerateFocusStoryOutput = z.infer<typeof GenerateFocusStoryOutputSchema>;


const focusStoryPrompt = ai.definePrompt({
    name: 'focusStoryPrompt',
    input: { schema: GenerateFocusStoryInputSchema },
    output: { schema: GenerateFocusStoryOutputSchema },
    prompt: `You are a creative storyteller for a calming focus game. Your task is to generate a short story about a plant growing. The user is in a focus session that will last for {{{sessionDuration}}} seconds.

    Based on the existing plants, {{{existingPlants}}}, invent a new, unique, and whimsically-named plant. It could be a "Sun-giggle Bloom" or a "Whisper Fern".
    
    Generate a one-sentence story about this new plant appearing, its name, and a short description.`,
});


export const generateFocusStoryFlow = ai.defineFlow(
  {
    name: 'generateFocusStoryFlow',
    inputSchema: GenerateFocusStoryInputSchema,
    outputSchema: GenerateFocusStoryOutputSchema,
  },
  async (input) => {
    const { output } = await focusStoryPrompt(input);
    return output!;
  }
);

export async function generateFocusStory(input: GenerateFocusStoryInput): Promise<GenerateFocusStoryOutput> {
    return generateFocusStoryFlow(input);
}
