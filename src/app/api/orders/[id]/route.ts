import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    console.log("ORDER ID:", id);

    const order = await Order.findById(id).lean();

    console.log("ORDER:", order);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    if (
      session.user.role !== 'admin' &&
      (order as any).userId !== session.user.id
    ) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    return NextResponse.json({ order });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const { orderStatus, paymentStatus, adminNote, invoiceEnabled, distanceCharge } = body;

    const update: Record<string, unknown> = {};
    if (orderStatus) {
      update.orderStatus = orderStatus;
      update.$push = {
        statusHistory: { status: orderStatus, date: new Date(), note: adminNote || '' },
      };
      if (orderStatus === 'delivered') update.deliveredAt = new Date();
    }
    if (paymentStatus) update.paymentStatus = paymentStatus;
    if (adminNote !== undefined) update.adminNote = adminNote;
    if (invoiceEnabled !== undefined) update.invoiceEnabled = invoiceEnabled;
    if (distanceCharge !== undefined) {
      update.distanceCharge = distanceCharge;
      // Recalculate total
      const existing = await Order.findById(id);
      if (existing) {
        update.totalAmount = existing.subtotal + existing.shippingCharge + distanceCharge - existing.discount;
      }
    }

    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    return NextResponse.json({ order });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
