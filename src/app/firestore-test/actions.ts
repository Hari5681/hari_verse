
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface SaveResponseInput {
  gender: string | null;
  name: string;
  question?: string;
  answer: string;
  comment?: string;
}

/**
 * Server action to save user response to Firestore.
 * @param input The user's response data.
 * @returns An object with success status and a message.
 */
export async function saveResponse(input: SaveResponseInput) {
  try {
    const docRef = await addDoc(collection(db, 'responses'), {
      ...input,
      createdAt: serverTimestamp(),
    });
    console.log('Document written to Firestore with ID: ', docRef.id);
    return { success: true, message: `Response saved for ${input.name}.` };
  } catch (error) {
    console.error('Error in saveResponse action: ', error);
    return { success: false, error: 'Something went wrong while saving your response.' };
  }
}
