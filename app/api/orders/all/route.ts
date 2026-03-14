
import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI!;

export async function GET(request: NextRequest) {
  let mongoClient;

  try {
    console.log('Fetching all orders...');
    
    // Connect to MongoDB
    mongoClient = new MongoClient(uri);
    await mongoClient.connect();
    const db = mongoClient.db();
    
    // Get all orders from database
    const ordersCollection = db.collection('orders');
    const orders = await ordersCollection
      .find({})
      .sort({ createdAt: -1 }) // Newest first
      .toArray();

    console.log(`Found ${orders.length} orders`);

    return NextResponse.json(
      orders.map(order => ({
        ...order,
        _id: order._id.toString(),
        orderId: order.orderId || order.orderNumber || order._id.toString(),
        orderStatus: order.status || 'pending',
        paymentDetails: {
          razorpayOrderId: order.razorpayOrderId || '',
          razorpayPaymentId: order.razorpayPaymentId || '',
          razorpaySignature: order.razorpaySignature || '',
          amount: order.priceDetails?.total || order.totalAmount || 0,
          currency: 'INR',
          status: order.paymentStatus || 'completed',
          paymentMethod: 'razorpay'
        },
        priceDetails: order.priceDetails || {
          subtotal: order.subtotal || 0,
          gst: order.gst || 0,
          shipping: order.shipping || 0,
          total: order.totalAmount || 0
        },
        billingAddress: order.billingAddress || {
          name: order.userName || 'Customer',
          email: order.userEmail || '',
          phone: order.userPhone || '',
          address: order.shippingAddress?.address || '',
          city: order.shippingAddress?.city || '',
          state: order.shippingAddress?.state || '',
          pincode: order.shippingAddress?.pincode || ''
        },
        items: order.items || [],
        createdAt: order.createdAt || new Date().toISOString(),
        updatedAt: order.updatedAt || new Date().toISOString()
      }))
    );

  } catch (error: any) {
    console.error('Error fetching orders:', error);
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