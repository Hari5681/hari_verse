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
  likesSurprises: z
    .boolean()
    .describe('Whether the user likes surprises or not.'),
  enjoysStories: z
    .boolean()
    .describe('Whether the user enjoys little stories or not.'),
  believesInMagic: z
    .boolean()
    .describe('Whether the user believes in magic moments or not.'),
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
  prompt: `Based on the user's answers, create a personalized proposal and responses.

User likes surprises: {{{likesSurprises}}}
User enjoys stories: {{{enjoysStories}}}
User believes in magic: {{{believesInMagic}}}

Craft a proposal text that reflects their preferences. If they like surprises, make it unexpected. If they enjoy stories, frame it as a narrative. If they believe in magic, add a touch of wonder.
Also create an affirmative and a negative response that take into account the users preferences.

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
