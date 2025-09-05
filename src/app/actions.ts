
'use server';

import { personalizeProposal, type PersonalizedProposalInput } from '@/ai/flows/personalized-proposal-reveal';

/**
 * Server action to get personalized proposal content from the AI flow.
 * @param input The user's preferences.
 * @returns An object with success status and either the personalized data or an error message.
 */
export async function getPersonalizedContent(input: PersonalizedProposalInput) {
  try {
    const personalizedContent = await personalizeProposal(input);
    return { success: true, data: personalizedContent };
  } catch (error) {
    console.error('AI proposal generation failed:', error);
    // In a real app, you might want to log this error to a monitoring service.
    return { success: false, error: 'Oops! Our magic ink seems to have run dry. Please try again.' };
  }
}
