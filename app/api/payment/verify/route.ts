// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import Order from '../../models/order';
// import { connectDB } from '@/app/lib/connectDB';

// const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     console.log('🔄 Payment verification request received:', {
//       razorpay_order_id: body.razorpay_order_id,
//       razorpay_payment_id: body.razorpay_payment_id,
//       hasOrderData: !!body.orderData
//     });

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderData
//     } = body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Missing payment details'
//         },
//         { status: 400 }
//       );
//     }

//     // Verify payment signature
//     const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', RAZORPAY_KEY_SECRET)
//       .update(bodyData)
//       .digest('hex');

//     const isSignatureValid = expectedSignature === razorpay_signature;

//     if (!isSignatureValid) {
//       console.error('❌ Invalid payment signature');
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Invalid payment signature'
//         },
//         { status: 400 }
//       );
//     }

//     console.log('✅ Payment signature verified');

//     // Connect to database
//     await connectDB();
//     console.log('✅ Connected to MongoDB');
    
//     // Check if order already exists by razorpayOrderId
//     const existingOrder = await Order.findOne({ 
//       razorpayOrderId: razorpay_order_id 
//     });

//     if (existingOrder) {
//       console.log('📦 Order already exists:', {
//         orderNumber: existingOrder.orderNumber,
//         _id: existingOrder._id,
//         totalAmount: existingOrder.priceDetails?.total
//       });
//       return NextResponse.json({
//         success: true,
//         message: 'Order already processed',
//         orderId: existingOrder.orderNumber,
//         existing: true
//       }, { status: 200 }); // Return 200 OK for existing orders
//     }

//     // Generate unique order number
//     const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
//     // Prepare order data
//     const orderToSave = {
//       orderNumber: orderNumber,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//       userName: orderData?.billingAddress?.name || 'Customer',
//       userEmail: orderData?.billingAddress?.email || '',
//       userPhone: orderData?.billingAddress?.phone || '',
//       items: (orderData?.items || []).map((item: any, index: number) => ({
//         bookId: item._id || item.bookId || `book-${index}`,
//         bookName: item.bookName || 'Unknown Book',
//         authorName: item.authorName || 'Unknown Author',
//         salePrice: item.salePrice || 0,
//         mrpPrice: item.mrpPrice || item.salePrice || 0,
//         image1: item.image1 || '/default-book.jpg',
//         quantity: item.quantity || 1,
//         totalPrice: (item.salePrice || 0) * (item.quantity || 1)
//       })),
//       billingAddress: {
//         name: orderData?.billingAddress?.name || 'Customer',
//         email: orderData?.billingAddress?.email || '',
//         phone: orderData?.billingAddress?.phone || '',
//         address: orderData?.billingAddress?.address || '',
//         city: orderData?.billingAddress?.city || '',
//         state: orderData?.billingAddress?.state || '',
//         pincode: orderData?.billingAddress?.pincode || ''
//       },
//       shippingAddress: {
//         name: orderData?.billingAddress?.name || 'Customer',
//         email: orderData?.billingAddress?.email || '',
//         phone: orderData?.billingAddress?.phone || '',
//         address: orderData?.billingAddress?.address || '',
//         city: orderData?.billingAddress?.city || '',
//         state: orderData?.billingAddress?.state || '',
//         pincode: orderData?.billingAddress?.pincode || ''
//       },
//       priceDetails: {
//         subtotal: orderData?.subtotal || 0,
//         gst: orderData?.gst || 0,
//         shipping: orderData?.shipping || 0,
//         total: orderData?.totalAmount || 0
//       },
//       status: 'confirmed',
//       paymentStatus: 'paid'
//     };

//     console.log('💾 Saving order to database:', JSON.stringify(orderToSave, null, 2));

//     // Save to MongoDB
//     const newOrder = new Order(orderToSave);
//     const savedOrder = await newOrder.save();

//     console.log('🎉 Order saved successfully:', {
//       orderNumber: savedOrder.orderNumber,
//       _id: savedOrder._id,
//       totalAmount: savedOrder.priceDetails.total,
//       itemsCount: savedOrder.items.length
//     });

//     return NextResponse.json({
//       success: true,
//       message: 'Payment verified and order saved successfully',
//       orderId: savedOrder.orderNumber,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       order: {
//         orderNumber: savedOrder.orderNumber,
//         totalAmount: savedOrder.priceDetails.total,
//         itemsCount: savedOrder.items.length,
//         status: savedOrder.status,
//         paymentStatus: savedOrder.paymentStatus
//       }
//     });

//   } catch (error: any) {
//     console.error('❌ Payment verification error:', error);
    
//     if (error.code === 11000) {
//       console.error('Duplicate key error:', error.keyValue);
//       return NextResponse.json({
//         success: true, // Still success for duplicate
//         error: 'Order already exists',
//         duplicateKey: error.keyValue
//       }, { status: 200 }); // Return 200 for duplicates
//     }
    
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Payment verification failed: ' + error.message,
//         code: error.code
//       },
//       { status: 500 }
//     );
//   }
// }


//aravinfd

// app/api/payment/verify/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import crypto from 'crypto';
// import mongoose from 'mongoose';
// import Order from '../../models/order';
// import { connectDB } from '../../../lib/connectDB';

// const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     console.log('🔄 Payment verification request received:', {
//       razorpay_order_id: body.razorpay_order_id,
//       razorpay_payment_id: body.razorpay_payment_id,
//       hasOrderData: !!body.orderData,
//       itemsCount: body.orderData?.items?.length,
//       totalAmount: body.orderData?.totalAmount
//     });

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderData
//     } = body;

//     // Validate required payment fields
//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
//       console.error('❌ Missing payment details');
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Missing payment details (order_id, payment_id, or signature)'
//         },
//         { status: 400 }
//       );
//     }

//     // Validate orderData
//     if (!orderData || !orderData.items || orderData.items.length === 0) {
//       console.error('❌ Invalid order data');
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Invalid order data - items are required'
//         },
//         { status: 400 }
//       );
//     }

//     // Verify Razorpay payment signature
//     const bodyData = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac('sha256', RAZORPAY_KEY_SECRET)
//       .update(bodyData)
//       .digest('hex');

//     const isSignatureValid = expectedSignature === razorpay_signature;

//     if (!isSignatureValid) {
//       console.error('❌ Invalid payment signature', {
//         expected: expectedSignature.substring(0, 20) + '...',
//         received: razorpay_signature.substring(0, 20) + '...'
//       });
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Invalid payment signature - payment verification failed'
//         },
//         { status: 400 }
//       );
//     }

//     console.log('✅ Payment signature verified successfully');

//     // Connect to MongoDB
//     await connectDB();
//     console.log('✅ Connected to MongoDB');
    
//     // Check if order already exists (prevent duplicate orders)
//     const existingOrder = await Order.findOne({ 
//       $or: [
//         { razorpayOrderId: razorpay_order_id },
//         { razorpayPaymentId: razorpay_payment_id }
//       ]
//     });

//     if (existingOrder) {
//       console.log('⚠️ Order already exists in database:', {
//         orderNumber: existingOrder.orderNumber,
//         _id: existingOrder._id.toString(),
//         status: existingOrder.status,
//         paymentStatus: existingOrder.paymentStatus,
//         totalAmount: existingOrder.priceDetails?.total
//       });
      
//       return NextResponse.json({
//         success: true,
//         message: 'Order already processed successfully',
//         orderId: existingOrder.orderNumber || existingOrder._id.toString(),
//         orderNumber: existingOrder.orderNumber,
//         existing: true,
//         order: {
//           orderNumber: existingOrder.orderNumber,
//           totalAmount: existingOrder.priceDetails?.total,
//           itemsCount: existingOrder.items?.length || 0,
//           status: existingOrder.status,
//           paymentStatus: existingOrder.paymentStatus,
//           createdAt: existingOrder.createdAt
//         }
//       }, { status: 200 }); // Return 200 OK for existing orders
//     }

//     // Generate unique order number with timestamp and random string
//     const timestamp = Date.now();
//     const randomStr = Math.random().toString(36).substr(2, 9).toUpperCase();
//     const orderNumber = `ORD-${timestamp}-${randomStr}`;
    
//     console.log('🆕 Creating new order:', orderNumber);

//     // Define an interface for validated items
//     interface ValidatedItem {
//       bookId: string;
//       bookName: string;
//       authorName: string;
//       salePrice: number;
//       mrpPrice: number;
//       image1: string;
//       quantity: number;
//       totalPrice: number;
//     }

//     // Update the type for validatedItems
//     const validatedItems: ValidatedItem[] = (orderData.items || []).map((item: any, index: number) => {
//       const bookId = item._id || item.bookId || `book-${timestamp}-${index}`;
//       const bookName = item.bookName || 'Unknown Book';
//       const authorName = item.authorName || 'Unknown Author';
//       const salePrice = parseFloat(item.salePrice) || 0;
//       const mrpPrice = parseFloat(item.mrpPrice || item.salePrice) || salePrice;
//       const quantity = parseInt(item.quantity) || 1;
      
//       return {
//         bookId,
//         bookName,
//         authorName,
//         salePrice,
//         mrpPrice,
//         image1: item.image1 || '/default-book.jpg',
//         quantity,
//         totalPrice: salePrice * quantity
//       };
//     });

//     const subtotal: number = validatedItems.reduce((sum, item) => sum + item.totalPrice, 0);

//     console.log('✅ Validated items:', {
//       count: validatedItems.length,
//       totalItems: validatedItems.reduce((sum, item) => sum + item.quantity, 0),
//       subtotal
//     });

//     // Prepare billing and shipping address with validation
//     const billingAddress = {
//       name: orderData?.billingAddress?.name || 'Customer',
//       email: orderData?.billingAddress?.email || '',
//       phone: orderData?.billingAddress?.phone || '',
//       address: orderData?.billingAddress?.address || '',
//       city: orderData?.billingAddress?.city || '',
//       state: orderData?.billingAddress?.state || '',
//       pincode: orderData?.billingAddress?.pincode || ''
//     };

//     const shippingAddress = orderData?.shippingAddress || billingAddress;

//     // Calculate price details with validation
//     const gst = parseFloat(orderData?.gst) || (subtotal * 0.18);
//     const shipping = parseFloat(orderData?.shipping) || (subtotal > 500 ? 0 : 40);
//     const total = parseFloat(orderData?.totalAmount) || (subtotal + gst + shipping);

//     // Prepare complete order document
//     const orderToSave = {
//       orderNumber,
//       razorpayOrderId: razorpay_order_id,
//       razorpayPaymentId: razorpay_payment_id,
//       razorpaySignature: razorpay_signature,
//       userName: billingAddress.name,
//       userEmail: billingAddress.email,
//       userPhone: billingAddress.phone,
//       items: validatedItems,
//       billingAddress,
//       shippingAddress,
//       priceDetails: {
//         subtotal,
//         gst,
//         shipping,
//         total
//       },
//       status: 'confirmed',
//       paymentStatus: 'paid',
//       userId: orderData?.userId || null
//     };

//     console.log('💾 Preparing to save order:', {
//       orderNumber,
//       userName: orderToSave.userName,
//       userEmail: orderToSave.userEmail,
//       itemsCount: orderToSave.items.length,
//       totalAmount: orderToSave.priceDetails.total,
//       status: orderToSave.status,
//       paymentStatus: orderToSave.paymentStatus
//     });

//     // Save order to MongoDB
//     const newOrder = new Order(orderToSave);
//     const savedOrder = await newOrder.save();

//     console.log('🎉 Order saved successfully to MongoDB:', {
//       _id: savedOrder._id.toString(),
//       orderNumber: savedOrder.orderNumber,
//       totalAmount: savedOrder.priceDetails.total,
//       itemsCount: savedOrder.items.length,
//       status: savedOrder.status,
//       paymentStatus: savedOrder.paymentStatus,
//       createdAt: savedOrder.createdAt
//     });

// // Return success response with complete order details
// return NextResponse.json(
//   {
//     success: true,
//     message: "Payment verified and order created successfully",
//     orderId: savedOrder.orderNumber,
//     orderNumber: savedOrder.orderNumber,
//     razorpayOrderId: razorpay_order_id,
//     razorpayPaymentId: razorpay_payment_id,
//     mongoId: savedOrder._id.toString(),
//     order: {
//       orderNumber: savedOrder.orderNumber,
//       userName: savedOrder.userName,
//       userEmail: savedOrder.userEmail,
//       totalAmount: savedOrder.priceDetails.total,
//       itemsCount: savedOrder.items.length,
//       status: savedOrder.status,
//       paymentStatus: savedOrder.paymentStatus,
//       createdAt: savedOrder.createdAt,
//       items: savedOrder.items.map(
//         (item: {
//           bookName: string;
//           quantity: number;
//           totalPrice?: number;
//         }) => ({
//           bookName: item.bookName,
//           quantity: item.quantity,
//           price: item.totalPrice ?? 0,
//         })
//       ),
//     },
//   },
//   { status: 200 }
// );


//   } catch (error: any) {
//     console.error('❌ Payment verification error:', {
//       message: error.message,
//       code: error.code,
//       name: error.name,
//       stack: error.stack?.split('\n')[0]
//     });
    
//     // Handle MongoDB duplicate key error (11000)
//     if (error.code === 11000) {
//       console.error('⚠️ Duplicate key error detected:', error.keyValue);
      
//       // Find the existing order
//       const existingOrder = await Order.findOne(error.keyValue);
      
//       return NextResponse.json({
//         success: true, // Still mark as success
//         message: 'Order already exists - payment was already processed',
//         orderId: existingOrder?.orderNumber || 'unknown',
//         orderNumber: existingOrder?.orderNumber,
//         existing: true,
//         duplicateKey: error.keyValue,
//         order: existingOrder ? {
//           orderNumber: existingOrder.orderNumber,
//           totalAmount: existingOrder.priceDetails?.total,
//           status: existingOrder.status,
//           paymentStatus: existingOrder.paymentStatus
//         } : null
//       }, { status: 200 }); // Return 200 for duplicates
//     }

//     // Handle mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.keys(error.errors).map(key => ({
//         field: key,
//         message: error.errors[key].message
//       }));
      
//       console.error('❌ Validation errors:', validationErrors);
      
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Order data validation failed',
//           validationErrors
//         },
//         { status: 400 }
//       );
//     }

//     // Handle MongoDB connection errors
//     if (error.name === 'MongoNetworkError' || error.name === 'MongoTimeoutError') {
//       console.error('❌ MongoDB connection error');
//       return NextResponse.json(
//         { 
//           success: false, 
//           error: 'Database connection failed - please try again',
//           details: error.message
//         },
//         { status: 503 }
//       );
//     }
    
//     // Generic error handler
//     return NextResponse.json(
//       { 
//         success: false, 
//         error: 'Payment verification failed',
//         message: error.message,
//         code: error.code || 'UNKNOWN_ERROR'
//       },
//       { status: 500 }
//     );
//   }
// }

// // Optional: Add GET method for checking order status
// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const orderId = searchParams.get('orderId');
//     const paymentId = searchParams.get('paymentId');

//     if (!orderId && !paymentId) {
//       return NextResponse.json(
//         { error: 'Order ID or Payment ID is required' },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     let order;
//     if (orderId) {
//       order = await Order.findOne({
//         $or: [
//           { orderNumber: orderId },
//           { razorpayOrderId: orderId }
//         ]
//       });
//     } else if (paymentId) {
//       order = await Order.findOne({ razorpayPaymentId: paymentId });
//     }

//     if (!order) {
//       return NextResponse.json(
//         { success: false, error: 'Order not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       order: {
//         orderNumber: order.orderNumber,
//         status: order.status,
//         paymentStatus: order.paymentStatus,
//         totalAmount: order.priceDetails?.total,
//         createdAt: order.createdAt
//       }
//     });

//   } catch (error: any) {
//     console.error('Error fetching order:', error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

// new 

import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Order from "../../models/order";
import { connectDB } from "../../../lib/connectDB";

const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = body;

    // ==========================
    // Validate payment fields
    // ==========================
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment details" },
        { status: 400 }
      );
    }

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order data - items required" },
        { status: 400 }
      );
    }

    // ==========================
    // Verify Razorpay signature
    // ==========================
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    await connectDB();

    // ==========================
    // Prevent duplicate orders
    // ==========================
    const existingOrder = await Order.findOne({
      $or: [
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id },
      ],
    });

    if (existingOrder) {
      return NextResponse.json(
        {
          success: true,
          message: "Order already processed",
          existing: true,
          orderNumber: existingOrder.orderNumber,
        },
        { status: 200 }
      );
    }

    // ==========================
    // Generate IDs
    // ==========================
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase();

    const orderId = `OID-${timestamp}-${randomStr}`;
    const orderNumber = `ORD-${timestamp}-${randomStr}`;

    // ==========================
    // Validate & normalize items
    // ==========================
    const validatedItems = orderData.items.map((item: any, index: number) => {
      const salePrice = Number(item.salePrice) || 0;
      const quantity = Number(item.quantity) || 1;

      return {
        bookId: item.bookId || item._id || `book-${timestamp}-${index}`,
        bookName: item.bookName || "Unknown Book",
        authorName: item.authorName || "Unknown Author",
        salePrice,
        mrpPrice: Number(item.mrpPrice) || salePrice,
        image1: item.image1 || "/default-book.jpg",
        quantity,
        totalPrice: salePrice * quantity,
      };
    });

    const subtotal = validatedItems.reduce(
      (sum: number, i: any) => sum + i.totalPrice,
      0
    );

    const gst = Number(orderData.gst) || subtotal * 0.18;
    const shipping = Number(orderData.shipping) || (subtotal > 500 ? 0 : 40);
    const total = Number(orderData.totalAmount) || subtotal + gst + shipping;

    // ==========================
    // Billing & Shipping (STRICT)
    // ==========================
    const billingAddress = {
      name: orderData.billingAddress?.name || "Customer",
      email: orderData.billingAddress?.email || "no-reply@example.com",
      phone: orderData.billingAddress?.phone || "0000000000",
      address: orderData.billingAddress?.address || "N/A",
      city: orderData.billingAddress?.city || "N/A",
      state: orderData.billingAddress?.state || "N/A",
      pincode: orderData.billingAddress?.pincode || "000000",
    };

    const shippingAddress = orderData.shippingAddress
      ? {
          ...billingAddress,
          ...orderData.shippingAddress,
        }
      : billingAddress;

    // ==========================
    // Save Order
    // ==========================
    const newOrder = new Order({
      orderId,
      orderNumber,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      userName: billingAddress.name,
      userEmail: billingAddress.email,
      userPhone: billingAddress.phone,
      items: validatedItems,
      billingAddress,
      shippingAddress,
      priceDetails: { subtotal, gst, shipping, total },
      status: "confirmed",
      paymentStatus: "paid",
      userId: orderData.userId || null,
    });

    const savedOrder = await newOrder.save();

    // ==========================
    // SUCCESS RESPONSE
    // ==========================
    return NextResponse.json(
      {
        success: true,
        message: "Payment verified and order created successfully",
        orderId: savedOrder.orderId,
        orderNumber: savedOrder.orderNumber,
        mongoId: savedOrder._id.toString(),
        order: {
          orderNumber: savedOrder.orderNumber,
          userName: savedOrder.userName,
          userEmail: savedOrder.userEmail,
          totalAmount: savedOrder.priceDetails.total,
          itemsCount: savedOrder.items.length,
          status: savedOrder.status,
          paymentStatus: savedOrder.paymentStatus,
          createdAt: savedOrder.createdAt,
          items: savedOrder.items.map((item: any) => ({
            bookName: item.bookName,
            quantity: item.quantity,
            price: item.totalPrice,
          })),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Payment verification error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Order data validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Payment verification failed", message: error.message },
      { status: 500 }
    );
  }
}
