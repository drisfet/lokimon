'use server';
/**
 * @fileOverview A flow for generating Focumon creatures.
 *
 * - generateFocumon - A function that creates a new Focumon.
 * - GenerateFocumonInput - The input type for the generateFocumon function.
 * - GeneratedFocumon - The return type for the generateFocumon function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFocumonInputSchema = z.object({
  prompt: z.string().describe('A short prompt describing the kind of Focumon to generate.'),
});
export type GenerateFocumonInput = z.infer<typeof GenerateFocumonInputSchema>;

const GeneratedFocumonSchema = z.object({
  name: z.string().describe('The name of the Focumon. Should be playful and unique.'),
  description: z.string().describe('A short, one-sentence description of the Focumon.'),
});
export type GeneratedFocumon = z.infer<typeof GeneratedFocumonSchema>;

const focumonGenerationPrompt = ai.definePrompt({
    name: 'focumonGenerationPrompt',
    input: { schema: GenerateFocumonInputSchema },
    output: { schema: GeneratedFocumonSchema },
    prompt: `You are a creative assistant for a game called Focumon. Your task is to invent a new Focumon based on a prompt. Focumon are cute, friendly creatures that help people focus.

    Prompt: {{{prompt}}}
    
    Generate a name and a description for this new Focumon. The name should be short, catchy, and unique. The description should be a single sentence that captures its essence.`,
});


export const generateFocumonFlow = ai.defineFlow(
  {
    name: 'generateFocumonFlow',
    inputSchema: GenerateFocumonInputSchema,
    outputSchema: GeneratedFocumonSchema,
  },
  async (input) => {
    const { output } = await focumonGenerationPrompt(input);
    return output!;
  }
);

export async function generateFocumon(input: GenerateFocumonInput): Promise<GeneratedFocumon> {
    return generateFocumonFlow(input);
}
