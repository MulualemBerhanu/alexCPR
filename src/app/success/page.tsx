"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [paymentInfo, setPaymentInfo] = useState<{
    className: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        setPaymentInfo(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to verify payment';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment();
    } else {
      setLoading(false);
      setError('No payment session found');
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-red-900">
              Verifying your payment...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 text-red-600 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-semibold mb-4">Payment Verification Error</h2>
              <p>{error}</p>
            </div>
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-red-900 mb-4">
              Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-700 mb-8">
              Thank you for booking your CPR training class.
            </p>

            {paymentInfo && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
                <h2 className="text-xl font-semibold text-red-900 mb-4">
                  Booking Details
                </h2>
                <ul className="space-y-3">
                  <li>
                    <span className="font-medium">Class:</span>{' '}
                    {paymentInfo.className}
                  </li>
                  <li>
                    <span className="font-medium">Email:</span>{' '}
                    {paymentInfo.email}
                  </li>
                </ul>
              </div>
            )}

            <p className="text-gray-700 mb-8">
              We&apos;ve sent a confirmation email with your booking details.
              Please check your inbox for further instructions.
            </p>

            <div className="space-y-4">
              <Link
                href="/classes"
                className="block w-full bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-colors"
              >
                View More Classes
              </Link>
              <Link
                href="/"
                className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 