
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
 * @param data The user's response data.
 * @returns An object with success status and a message.
 */
export async function saveResponse(data: SaveResponseInput) {
  try {
    const responseToSave = {
      name: data.name,
      gender: data.gender,
      answer: data.answer,
      question: data.question || null,
      comment: data.comment || null,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, 'responses'), responseToSave);
    console.log('Document written to Firestore with ID: ', docRef.id);
    return { success: true, message: `Response saved for ${data.name}.` };
  } catch (error) {
    console.error('Error in saveResponse action: ', error);
    return { success: false, error: 'Something went wrong while saving your response.' };
  }
}
