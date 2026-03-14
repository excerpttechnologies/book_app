

// // import { NextResponse } from 'next/server';
// // import mongoose from 'mongoose';
// // import { connectDB } from '@/app/lib/connectDB';

// // export async function GET() {
// //   try {
// //     await connectDB();
    
// //     const db = mongoose.connection.db;
    
// //     // Get all collections
// //     const collections = await db.listCollections().toArray();
// //     console.log('📁 Collections:', collections.map(c => c.name));
    
// //     // Check each collection for orders
// //     let allOrders: any[] = [];
    
// //     for (const collectionInfo of collections) {
// //       const collection = db.collection(collectionInfo.name);
// //       const count = await collection.countDocuments();
      
// //       if (count > 0) {
// //         const orders = await collection.find({}).limit(5).toArray();
// //         console.log(`📦 Collection "${collectionInfo.name}" (${count} docs):`, 
// //           orders.map(order => ({
// //             _id: order._id,
// //             orderNumber: order.orderNumber,
// //             razorpayOrderId: order.razorpayOrderId,
// //             userName: order.userName,
// //             total: order.priceDetails?.total || order.totalAmount,
// //             paymentStatus: order.paymentStatus,
// //             createdAt: order.createdAt
// //           }))
// //         );
        
// //         if (orders.some(order => order.razorpayOrderId || order.orderNumber)) {
// //           allOrders = [...allOrders, ...orders];
// //         }
// //       }
// //     }
    
// //     return NextResponse.json({
// //       totalCollections: collections.length,
// //       totalOrdersFound: allOrders.length,
// //       collections: collections.map(c => c.name),
// //       orders: allOrders.map(order => ({
// //         collection: 'orders', // or whichever collection it's from
// //         _id: order._id,
// //         orderNumber: order.orderNumber,
// //         razorpayOrderId: order.razorpayOrderId,
// //         userName: order.userName,
// //         total: order.priceDetails?.total || order.totalAmount,
// //         paymentStatus: order.paymentStatus,
// //         createdAt: order.createdAt
// //       }))
// //     });
// //   } catch (error: any) {
// //     return NextResponse.json(
// //       { error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }


// // app/api/orders/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { MongoClient, ObjectId } from 'mongodb';

// const MONGODB_URI = process.env.MONGODB_URI || '';
// const DB_NAME = process.env.DB_NAME || 'bookstore';

// let cachedClient: MongoClient | null = null;

// async function connectToDatabase() {
//   if (cachedClient) {
//     return cachedClient;
//   }

//   const client = await MongoClient.connect(MONGODB_URI);
//   cachedClient = client;
//   return client;
// }

// // GET - Fetch all orders or filter by user email
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const email = searchParams.get('email');
    
//     const client = await connectToDatabase();
//     const db = client.db(DB_NAME);
//     const ordersCollection = db.collection('orders');

//     let query = {};
//     if (email) {
//       query = { userEmail: email };
//     }

//     const orders = await ordersCollection
//       .find(query)
//       .sort({ createdAt: -1 })
//       .toArray();

//     console.log(`✅ Found ${orders.length} orders${email ? ` for ${email}` : ''}`);

//     return NextResponse.json(orders, { status: 200 });
//   } catch (error) {
//     console.error('❌ Error fetching orders:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch orders', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

// // PUT - Update order status
// export async function PUT(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get('orderId');
    
//     if (!orderId) {
//       return NextResponse.json(
//         { error: 'Order ID is required' },
//         { status: 400 }
//       );
//     }

//     const body = await request.json();
//     const { status, orderStatus } = body;
//     const newStatus = status || orderStatus;

//     if (!newStatus) {
//       return NextResponse.json(
//         { error: 'Status is required' },
//         { status: 400 }
//       );
//     }

//     const client = await connectToDatabase();
//     const db = client.db(DB_NAME);
//     const ordersCollection = db.collection('orders');

//     // Try to find by different ID formats
//     let filter: any = {};
    
//     // Try as MongoDB ObjectId
//     if (ObjectId.isValid(orderId)) {
//       filter = { _id: new ObjectId(orderId) };
//     } else {
//       // Try as orderNumber or razorpayOrderId
//       filter = {
//         $or: [
//           { orderNumber: orderId },
//           { razorpayOrderId: orderId }
//         ]
//       };
//     }

//     const result = await ordersCollection.updateOne(
//       filter,
//       {
//         $set: {
//           status: newStatus,
//           updatedAt: new Date()
//         }
//       }
//     );

//     if (result.matchedCount === 0) {
//       return NextResponse.json(
//         { error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     console.log(`✅ Updated order ${orderId} to status: ${newStatus}`);

//     return NextResponse.json({
//       success: true,
//       message: 'Order status updated successfully',
//       orderId,
//       newStatus
//     });
//   } catch (error) {
//     console.error('❌ Error updating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to update order', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }

// // POST - Create new order (for testing or manual creation)
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
    
//     const client = await connectToDatabase();
//     const db = client.db(DB_NAME);
//     const ordersCollection = db.collection('orders');

//     const newOrder = {
//       ...body,
//       createdAt: new Date(),
//       updatedAt: new Date()
//     };

//     const result = await ordersCollection.insertOne(newOrder);

//     console.log(`✅ Created new order: ${result.insertedId}`);

//     return NextResponse.json({
//       success: true,
//       orderId: result.insertedId,
//       message: 'Order created successfully'
//     }, { status: 201 });
//   } catch (error) {
//     console.error('❌ Error creating order:', error);
//     return NextResponse.json(
//       { error: 'Failed to create order', details: error instanceof Error ? error.message : 'Unknown error' },
//       { status: 500 }
//     );
//   }
// }



// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Order from '../models/order';
import  { connectDB }  from '../../lib/connectDB';

// GET - Fetch all orders or filter by user email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    console.log('🔍 GET /api/orders - Email filter:', email || 'none');

    // Connect to MongoDB
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Build query
    let query = {};
    if (email) {
      query = { userEmail: email };
    }

    // Fetch orders from database
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    console.log(`✅ Found ${orders.length} orders${email ? ` for ${email}` : ''}`);

    // Return orders as JSON
    return NextResponse.json(orders, { 
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error: any) {
    console.error('❌ Error fetching orders:', {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n')[0]
    });

    return NextResponse.json(
      { 
        error: 'Failed to fetch orders', 
        details: error.message,
        type: error.name
      },
      { status: 500 }
    );
  }
}

// PUT - Update order status
export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    
    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, orderStatus } = body;
    const newStatus = status || orderStatus;

    if (!newStatus) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    console.log(`🔄 Updating order ${orderId} to status: ${newStatus}`);

    // Connect to MongoDB
    await connectDB();

    // Try to find and update by different ID formats
    let updatedOrder;

    // Try as MongoDB ObjectId first
    if (mongoose.Types.ObjectId.isValid(orderId)) {
      updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
          status: newStatus,
          updatedAt: new Date()
        },
        { new: true }
      );
    }

    // If not found, try by orderNumber or razorpayOrderId
    if (!updatedOrder) {
      updatedOrder = await Order.findOneAndUpdate(
        {
          $or: [
            { orderNumber: orderId },
            { razorpayOrderId: orderId }
          ]
        },
        {
          status: newStatus,
          updatedAt: new Date()
        },
        { new: true }
      );
    }

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log(`✅ Updated order ${orderId} to status: ${newStatus}`);

    return NextResponse.json({
      success: true,
      message: 'Order status updated successfully',
      orderId,
      newStatus,
      order: updatedOrder
    });

  } catch (error: any) {
    console.error('❌ Error updating order:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update order', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}

// POST - Create new order (optional, for testing)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('📝 Creating new order');

    // Connect to MongoDB
    await connectDB();

    const newOrder = new Order({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const savedOrder = await newOrder.save();

    console.log(`✅ Created new order: ${savedOrder._id}`);

    return NextResponse.json({
      success: true,
      orderId: savedOrder._id,
      orderNumber: savedOrder.orderNumber,
      message: 'Order created successfully',
      order: savedOrder
    }, { status: 201 });

  } catch (error: any) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create order', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}