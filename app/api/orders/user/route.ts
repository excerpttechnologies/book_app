// app/api/orders/user/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const DB_NAME = process.env.DB_NAME || 'bookstore';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }
  const client = await MongoClient.connect(MONGODB_URI);
  cachedClient = client;
  return client;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    console.log('🔍 Fetching orders for user:', email);

    const client = await connectToDatabase();
    const db = client.db(DB_NAME);
    const ordersCollection = db.collection('orders');

    const orders = await ordersCollection
      .find({ userEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`✅ Found ${orders.length} orders for ${email}`);

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('❌ Error fetching user orders:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch orders',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}