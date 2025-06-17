import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    const apiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.TO_EMAIL || 'contact@alexcpr.com';
    const fromEmail = process.env.FROM_EMAIL || 'no-reply@alexcpr.com';

    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Brevo API key' }, { status: 500 });
    }

    // Send email using Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'AlexCPR Contact', email: fromEmail },
        to: [{ email: toEmail }],
        subject: `New Contact Form Submission from ${name}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
        replyTo: { email },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
} 