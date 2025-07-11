import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

// Helper function to send email using Brevo
async function sendEmail(toEmail: string, subject: string, htmlContent: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "ruthalex57@hotmail.com";

  if (!apiKey) {
    console.error('BREVO_API_KEY environment variable is not set');
    return false;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'AlexCPR', email: fromEmail },
        to: [{ email: toEmail }],
        subject: subject,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Email sending error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Session ID is required' },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    // Extract payment details
    const customerEmail = session.customer_details?.email || '';
    const className = session.metadata?.className || '';
    const amount = session.amount_total ? session.amount_total / 100 : 0; // Convert from cents
    const paymentStatus = session.payment_status;
    const customerName = session.metadata?.customerName || session.customer_details?.name || 'Customer';
    const customerPhone = session.metadata?.customerPhone || session.customer_details?.phone || 'N/A';
    const bookingDate = session.metadata?.bookingDate || '';
    const bookingTime = session.metadata?.bookingTime || '';

    // Only send emails if payment was successful
    if (paymentStatus === 'paid') {
      const adminEmail = process.env.CONTACT_TO_EMAIL || "ruthalex57@hotmail.com";
      
      // Styled summary for both admin and customer
      const summaryHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; box-shadow: 0 2px 8px #0001; padding: 32px 24px;">
          <div style="text-align: center; margin-bottom: 24px;">
            <div style="width: 56px; height: 56px; background: #ffe5e5; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px auto;">
              <span style="font-size: 32px; color: #e53e3e;">✔️</span>
            </div>
            <h2 style="color: #b91c1c; font-size: 1.5rem; font-weight: bold; margin-bottom: 8px;">Payment Successful!</h2>
            <p style="color: #374151; font-size: 1.1rem;">Thank you for booking your CPR training class.</p>
          </div>
          <div style="background: #f9fafb; border-radius: 8px; padding: 20px 16px; margin-bottom: 24px;">
            <h3 style="color: #b91c1c; font-size: 1.1rem; font-weight: bold; margin-bottom: 12px;">Booking Details</h3>
            <ul style="list-style: none; padding: 0; margin: 0; color: #374151; font-size: 1rem;">
              <li><strong>Class:</strong> ${className}</li>
              <li><strong>Name:</strong> ${customerName}</li>
              <li><strong>Email:</strong> ${customerEmail}</li>
              <li><strong>Phone:</strong> ${customerPhone}</li>
              <li><strong>Date:</strong> ${bookingDate}</li>
              <li><strong>Time:</strong> ${bookingTime}</li>
              <li><strong>Amount Paid:</strong> $${amount.toFixed(2)}</li>
              <li><strong>Payment Status:</strong> Confirmed</li>
              <li><strong>Session ID:</strong> ${sessionId}</li>
            </ul>
          </div>
          <p style="color: #374151; font-size: 1rem; margin-bottom: 16px;">We will contact you soon to confirm your class date and time. If you have any questions, please contact us at <a href="mailto:contact@alexcpr.com" style="color: #e53e3e; text-decoration: underline;">contact@alexcpr.com</a> or call (360) 314-7506.</p>
          <p style="color: #6b7280; font-size: 0.95rem; text-align: center;">Thank you for choosing AlexCPR!</p>
        </div>
      `;

      // Send email to admin
      await sendEmail(adminEmail, `New Booking Confirmation - ${className}`, summaryHtml);
      // Send confirmation email to customer
      await sendEmail(customerEmail, `Booking Confirmation - ${className}`, summaryHtml);
    }

    // Return relevant session data
    return NextResponse.json({
      className: className,
      email: customerEmail,
      amount: amount,
      paymentStatus: paymentStatus,
      customerName,
      customerPhone,
      bookingDate,
      bookingTime,
    });
  } catch (error) {
    console.error('Stripe verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payment' },
      { status: 500 }
    );
  }
} 