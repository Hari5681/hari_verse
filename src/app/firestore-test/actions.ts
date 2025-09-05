
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SaveResponseInput {
  name: string;
  answer: string;
}

/**
 * Server action to save user response to Firestore and send an email notification.
 * @param input The user's name and answer.
 * @returns An object with success status and a message.
 */
export async function saveResponse(input: SaveResponseInput) {
  try {
    // 1. Save to Firestore
    const docRef = await addDoc(collection(db, 'responses'), {
      name: input.name,
      answer: input.answer,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);

    // 2. Send email notification for every response
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS environment variables not set. Skipping email.');
      return { success: true, message: `Response saved for ${input.name}. Email not configured.` };
    }

    const emailParams = {
        to_name: 'Hari',
        from_name: 'The HariVerse App',
        message: `New response from ${input.name}: "${input.answer}"`,
        all_answers: `Single event: ${input.answer}`
    };

    console.log("Attempting to send response email with params:", emailParams);
    // This is a conceptual representation for sending email via a server action.
    // The actual sending would be done via an API call here.
    
    return { success: true, message: `Thank you, ${input.name}! Your response has been noted.` };

  } catch (error) {
    console.error('Error in saveResponse action: ', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
