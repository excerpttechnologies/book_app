import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import Book from '@/models/Book';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { v4 as uuidv4 } from 'uuid';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');

    const query: Record<string, unknown> = {};

    if (session.user.role !== 'admin') {
      query.userId = session.user.id;
    } else {
      if (status) query.orderStatus = status;
      if (paymentStatus) query.paymentStatus = paymentStatus;
      if (search) {
        query.$or = [
          { orderId: { $regex: search, $options: 'i' } },
          { userEmail: { $regex: search, $options: 'i' } },
          { userName: { $regex: search, $options: 'i' } },
        ];
      }
    }

    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(query),
    ]);

    return NextResponse.json({ orders, pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const { items, billingAddress, paymentMethod, razorpayOrderId } = body;

    // Validate items and calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const book = await Book.findById(item.bookId);
      if (!book) return NextResponse.json({ error: `Book not found: ${item.bookId}` }, { status: 400 });
      if (book.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for: ${book.title}` }, { status: 400 });
      }
      subtotal += book.price * item.quantity;
      orderItems.push({
        bookId: book._id.toString(),
        title: book.title,
        author: book.author,
        image: book.images[0] || '',
        price: book.price,
        quantity: item.quantity,
      });
      // Reduce stock
      await Book.findByIdAndUpdate(book._id, { $inc: { stock: -item.quantity, soldCount: item.quantity } });
    }

    const orderId = `SB${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

    const order = await Order.create({
      orderId,
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      items: orderItems,
      billingAddress,
      subtotal,
      shippingCharge: 0,
      distanceCharge: 0,
      discount: 0,
      totalAmount: subtotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'pay_later' ? 'pending' : 'pending',
      razorpayOrderId,
      orderStatus: 'placed',
      statusHistory: [{ status: 'placed', date: new Date(), note: 'Order placed successfully' }],
      invoiceEnabled: false,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
