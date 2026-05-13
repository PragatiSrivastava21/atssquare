import 'dotenv/config';
import fetch from 'node-fetch';

async function main() {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY in environment. Set it in .env');
    process.exit(1);
  }

  const payload = {
    from: 'onboarding@resend.dev',
    to: 'abhishekkushwaha4732@gmail.com',
    subject: 'Hello World',
    html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
  };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('Resend API error', res.status, text);
      process.exit(2);
    }

    console.log('Email sent successfully. Response:');
    console.log(text);
  } catch (err) {
    console.error('Request failed', err);
    process.exit(3);
  }
}

main();
