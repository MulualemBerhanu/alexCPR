// Checkout temporarily disabled for deployment
// export async function POST(req: Request) {
//   // ...existing code...
// } 

import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(request: Request) {
  try {
    const { classId, className, price, customerName, customerEmail, customerPhone, bookingDate, bookingTime } = await request.json();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: className,
              description: `CPR Training Class: ${className}`,
            },
            unit_amount: price * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/book?class=${classId}`,
      customer_email: customerEmail,
      metadata: {
        classId,
        className,
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        bookingDate: bookingDate || '',
        bookingTime: bookingTime || '',
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 