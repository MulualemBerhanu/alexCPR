import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const resend = new Resend(process.env.RESEND_API_KEY);

const sendConfirmationEmail = async (email: string, className: string) => {
  await resend.emails.send({
    from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
    to: email,
    subject: 'Your CPR Training Class Confirmation',
    html: `
      <h1>Thank You for Booking Your CPR Training Class!</h1>
      <p>Your registration for ${className} has been confirmed.</p>
      <p>We're excited to help you learn life-saving skills!</p>
      <h2>Next Steps:</h2>
      <ol>
        <li>Add the class to your calendar</li>
        <li>Review any pre-class materials (if provided)</li>
        <li>Arrive 10 minutes early on the day of training</li>
      </ol>
      <p>If you need to make any changes to your booking, please contact us.</p>
      <p>Best regards,<br>AlexCPR Team</p>
    `,
  });
};

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature provided' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Send confirmation email
      if (session.customer_details?.email && session.metadata?.className) {
        await sendConfirmationEmail(
          session.customer_details.email,
          session.metadata.className
        );
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    );
  }
} 