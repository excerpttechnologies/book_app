// import { NextRequest, NextResponse } from 'next/server';
// import Order from '../../models/order';
// import { connectDB } from '../../connectDB';

// export async function POST(request: NextRequest) {
//   await connectDB();
  
//   try {
//     const orderData = await request.json();

//     // Validate required fields
//     const requiredFields = ['items', 'billingAddress', 'priceDetails'];
//     for (const field of requiredFields) {
//       if (!orderData[field]) {
//         return NextResponse.json(
//           { error: `Missing required field: ${field}` },
//           { status: 400 }
//         );
//       }
//     }

//     // Create order
//     const order = new Order({
//       orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
//       items: orderData.items,
//       billingAddress: orderData.billingAddress,
//       paymentDetails: orderData.paymentDetails || {
//         status: 'pending',
//         currency: 'INR'
//       },
//       priceDetails: orderData.priceDetails,
//       orderStatus: orderData.paymentDetails?.status === 'completed' ? 'confirmed' : 'pending'
//     });

//     await order.save();

//     return NextResponse.json({
//       success: true,
//       orderId: order.orderId,
//       order: order
//     }, { status: 201 });

//   } catch (error) {
//     console.error('Order creation error:', error);
//     return NextResponse.json(
//       { error: 'Failed to create order' },
//       { status: 500 }
//     );
//   }
// }



//before build

import { NextRequest, NextResponse } from "next/server";
import Order from "../../models/order";
import { connectDB } from "../../connectDB";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const orderData = await request.json();

    // Validate required fields
    const requiredFields = ["items", "billingAddress", "priceDetails"];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create order
    const order = new Order({
      orderId: `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`,
      items: orderData.items,
      billingAddress: orderData.billingAddress,
      paymentDetails: orderData.paymentDetails || {
        status: "pending",
        currency: "INR",
      },
      priceDetails: orderData.priceDetails,
      orderStatus:
        orderData.paymentDetails?.status === "completed"
          ? "confirmed"
          : "pending",
    });

    await order.save();

    return NextResponse.json(
      {
        success: true,
        orderId: order.orderId,
        order: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
