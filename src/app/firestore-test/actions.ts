'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SaveResponseInput {
  name: string;
  answer: 'Yes' | 'No';
}

/**
 * Server action to save user response to Firestore.
 * @param input The user's name and answer.
 * @returns An object with success status and a message.
 */
export async function saveResponse(input: SaveResponseInput) {
  try {
    const docRef = await addDoc(collection(db, 'responses'), {
      name: input.name,
      answer: input.answer,
      createdAt: serverTimestamp(),
    });
    console.log('Document written with ID: ', docRef.id);
    return { success: true, message: `Thank you, ${input.name}! Your response has been saved.` };
  } catch (error) {
    console.error('Error adding document: ', error);
    return { success: false, error: 'Something went wrong. Please try again.' };
  }
}
