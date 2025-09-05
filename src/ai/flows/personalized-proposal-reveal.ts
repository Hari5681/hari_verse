'use server';

/**
 * @fileOverview An AI agent that personalizes the proposal reveal and responses based on user choices.
 *
 * - personalizeProposal - A function that personalizes the proposal.
 * - PersonalizedProposalInput - The input type for the personalizeProposal function.
 * - PersonalizedProposalOutput - The return type for the personalizeProposal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedProposalInputSchema = z.object({
  believesInDestiny: z
    .boolean()
    .describe('Whether the user believes in destiny and one true love.'),
  loveStyle: z
    .string()
    .describe('The user\'s preferred style of love, described as a type of food (e.g., "Sweet like chocolate", "Spicy like biryani").'),
  confessionPreference: z
    .string()
    .describe('How the user thinks a secret admirer should confess (e.g., "With flowers and courage", "By writing a cute story/letter").'),
});
export type PersonalizedProposalInput = z.infer<
  typeof PersonalizedProposalInputSchema
>;

const PersonalizedProposalOutputSchema = z.object({
  proposalText: z.string().describe('The personalized proposal text.'),
  responseAffirmative: z
    .string()
    .describe('The personalized response for a positive answer.'),
  responseNegative: z
    .string()
    .describe('The personalized response for a negative answer.'),
});
export type PersonalizedProposalOutput = z.infer<
  typeof PersonalizedProposalOutputSchema
>;

export async function personalizeProposal(
  input: PersonalizedProposalInput
): Promise<PersonalizedProposalOutput> {
  return personalizedProposalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedProposalPrompt',
  input: {schema: PersonalizedProposalInputSchema},
  output: {schema: PersonalizedProposalOutputSchema},
  prompt: `Based on the user's answers from a fun, romantic quiz, create a personalized proposal and responses.

Here are the user's preferences:
- Believes in destiny/one true love: {{{believesInDestiny}}}
- Their preferred "love style" (like food): "{{{loveStyle}}}"
- How they think a secret admirer of 2 years should confess: "{{{confessionPreference}}}"

Your Task:
1.  **Craft a short, heartfelt, and slightly playful proposal text.** This is the "Will you be my special one?" moment. It should subtly reference their answers. For example:
    *   If they believe in destiny, you could mention "maybe this was written in the stars."
    *   If they prefer a "spicy" love style, you could say something a bit more bold.
    *   Crucially, if they preferred a confession "by writing a cute story/letter", you MUST start the proposal with "Since you like stories, here’s a short one for you..." and then continue with the proposal. If they chose flowers, you could mention something about a feeling "blossoming". If they chose "direct", be more straightforward.

2.  **Create a personalized affirmative response.** This is for when they say "Yes." It should be filled with joy and relief.

3.  **Create a gentle, personalized negative response.** This is for when they say "It's okay." It should be understanding and kind, respecting their answer while still valuing them.

Keep the tone romantic, a little playful, and very personal.

Output in JSON format.
`,
});

const personalizedProposalFlow = ai.defineFlow(
  {
    name: 'personalizedProposalFlow',
    inputSchema: PersonalizedProposalInputSchema,
    outputSchema: PersonalizedProposalOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
