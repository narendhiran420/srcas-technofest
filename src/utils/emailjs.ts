import emailjs from '@emailjs/browser';

// ⚠️ Replace with YOUR EmailJS credentials from https://dashboard.emailjs.com
const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';

interface ConfirmationParams {
  to_name: string;
  to_email: string;
  event_name: string;
  [key: string]: unknown;
}

export async function sendConfirmationEmail(params: ConfirmationParams) {
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, params, { publicKey: PUBLIC_KEY });
    return true;
  } catch (err) {
    console.error('EmailJS confirmation failed:', err);
    return false;
  }
}
