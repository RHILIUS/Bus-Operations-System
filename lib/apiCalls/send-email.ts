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
export const sendEmail = async (token: string, params: SendEmailParams) => {
  try {
    const res = await fetch(Send_EMAIL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      credentials: 'include',
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