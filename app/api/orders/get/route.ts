import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGO_URI!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const admin = searchParams.get('admin') === 'true';
  
  let mongoClient;

  try {
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    const db = mongoClient.db();
    const ordersCollection = db.collection('orders');

    let query = {};
    
    // If not admin and userId is provided, only get user's orders
    if (!admin && userId) {
      query = { userId: userId };
    }
    // If admin, get all orders
    else if (admin) {
      // Admin can see all orders
      query = {};
    }
    // If no userId and not admin, return error
    else if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required for non-admin users' },
        { status: 400 }
      );
    }

    const orders = await ordersCollection
      .find(query)
      .sort({ createdAt: -1 }) // Newest first
      .toArray();

    return NextResponse.json({
      success: true,
      orders: orders.map(order => ({
        ...order,
        _id: order._id.toString()
      }))
    });

  } catch (error: any) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  } finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
}