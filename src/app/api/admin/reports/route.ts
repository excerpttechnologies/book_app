import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Book from '@/models/Book';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'orders';
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const dateFilter: Record<string, unknown> = {};
    if (from || to) {
      dateFilter.createdAt = {};
      if (from) (dateFilter.createdAt as any).$gte = new Date(from);
      if (to) (dateFilter.createdAt as any).$lte = new Date(to);
    }

    let data: any[] = [];

    if (type === 'orders') {
      data = await Order.find(dateFilter).sort({ createdAt: -1 }).lean();
    } else if (type === 'revenue') {
      data = await Order.aggregate([
        { $match: { paymentStatus: 'paid', ...dateFilter } },
        {
          $group: {
            _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
            revenue: { $sum: '$totalAmount' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]);
    } else if (type === 'users') {
      data = await User.find({ role: 'user', ...dateFilter }).select('-password').lean();
    } else if (type === 'books') {
      data = await Book.find(dateFilter).sort({ soldCount: -1 }).lean();
    }

    return NextResponse.json({ data, type });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
