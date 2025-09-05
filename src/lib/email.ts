
'use client';

import emailjs from '@emailjs/browser';

interface EmailData {
    gender: string | null;
    name: string;
    question?: string;
    answer: string;
    comment?: string;
}

/**
 * Sends an email with the user's response using EmailJS.
 * This should be called from a client component.
 * @param data The user's response data.
 */
export function sendResponseEmail(data: EmailData) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey || templateId === 'YOUR_TEMPLATE_ID') {
        console.warn('EmailJS environment variables not set correctly. Please check your .env file. Skipping email.');
        return;
    }
    
    // Construct a more detailed message for the email
    let message = `
      New Response from HariVerse ✨\n
      --------------------------------\n
      User Name: ${data.name || 'N/A'}\n
      Gender: ${data.gender || 'N/A'}\n
      --------------------------------\n
    `;

    if (data.question) {
        message += `Question: ${data.question}\n`;
        message += `Answer: ${data.answer}\n`;
    } else if (data.comment || data.comment === '') { // Handle empty comment submission
        message += `Comment: ${data.comment || 'Not provided'}\n`;
    } else {
        message += `Action: ${data.answer}\n`;
    }
    message += `--------------------------------\n`;

    const templateParams = {
        from_name: data.name,
        to_name: 'Hari',
        message: message,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
            console.log('EmailJS SUCCESS!', response.status, response.text);
        })
        .catch((err) => {
            console.error('EmailJS FAILED...', err);
        });
}
