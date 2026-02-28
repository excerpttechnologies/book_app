import { NextRequest, NextResponse } from 'next/server';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt } = await request.json();

    console.log('🔄 Creating Razorpay order:', { amount, currency, receipt });

    if (!amount) {
      return NextResponse.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay credentials missing');
      return NextResponse.json(
        { error: 'Payment gateway configuration error' },
        { status: 500 }
      );
    }

    // Create order in Razorpay
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`
      },
      body: JSON.stringify({
        amount: Math.round(amount), // Razorpay expects amount in paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        payment_capture: 1
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Razorpay order creation failed:', data);
      throw new Error(data.error?.description || 'Failed to create order');
    }

    console.log('✅ Razorpay order created successfully:', data.id);

    return NextResponse.json({
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      status: data.status
    });

  } catch (error: any) {
    console.error('❌ Order creation error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}