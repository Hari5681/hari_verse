'use server';
/**
 * @fileOverview A simple AI chat flow.
 *
 * - chat - A function that takes a message and returns an AI response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("The AI's response to the user's message."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const llmResponse = await ai.generate({
      prompt: `You are a helpful assistant. Please respond to the user's message: ${input.message}`,
      model: 'googleai/gemini-1.5-flash-preview',
      config: {
        temperature: 0.7,
      },
    });

    return {
      response: llmResponse.text,
    };
  }
);
