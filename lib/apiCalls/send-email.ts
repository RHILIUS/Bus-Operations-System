import { authenticatedFetch } from '@/lib/authenticatedFetch';
import { Send_EMAIL_URL } from '@/lib/urls';

interface SendEmailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

/**
 * Send an email via the backend email service
 */
export const sendEmail = async (params: SendEmailParams) => {
  try {
    const res = await authenticatedFetch(Send_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to send email');
    }

    return await res.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};