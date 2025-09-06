
'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactFormValues = z.infer<typeof formSchema>;

/**
 * Server action to save a contact message to Firestore.
 * @param data The validated contact form data.
 * @returns An object with success status and a message or error.
 */
export async function saveContactMessage(data: ContactFormValues) {
  try {
    // Re-validate on the server to be safe
    const validatedData = formSchema.parse(data);

    await addDoc(collection(db, 'contacts'), {
      ...validatedData,
      createdAt: serverTimestamp(),
    });

    return { success: true, message: 'Message saved successfully.' };
  } catch (error) {
    console.error('Error saving contact message:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Validation failed on the server.' };
    }
    return { success: false, error: 'An unexpected error occurred.' };
  }
}
