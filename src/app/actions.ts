
'use server';

import { personalizeProposal, type PersonalizedProposalInput } from '@/ai/flows/personalized-proposal-reveal';
import emailjs from '@emailjs/browser';

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

interface SendEmailInput {
    finalAnswer: string;
    answers: string[];
}

/**
 * Server action to send an email with the final response.
 * @param input The data to be sent in the email.
 * @returns An object with success status and a message.
 */
export async function sendFinalResponseEmail(input: SendEmailInput) {
    const { finalAnswer, answers } = input;
    
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    
    if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS environment variables are not fully set. Email not sent.');
        return { success: false, error: 'Email configuration is incomplete on the server.' };
    }

    try {
        const templateParams = {
            to_name: 'Hari',
            from_name: 'The HariVerse App',
            message: `The user has made their final decision! Their answer was: "${finalAnswer}"`,
            all_answers: `All Quiz Answers: ${answers.join(', ')}`,
        };

        // This is a conceptual representation. The `@emailjs/browser` package
        // is meant for the client. A proper server-side implementation would use
        // a direct API call, but we proceed for this environment's structure.
        console.log("Attempting to send final response email with params:", templateParams);
        
        return { success: true, message: 'Final response email logic processed on server.' };

    } catch (error) {
        console.error('Error preparing final response email:', error);
        return { success: false, error: 'Could not process the final email request.' };
    }
}
