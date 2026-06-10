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
    const filter = searchParams.get('filter') || 'monthly';

    const now = new Date();
    let startDate: Date;

    if (filter === 'daily') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (filter === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    } else {
      startDate = new Date(now.getFullYear(), 0, 1);
    }

    const [
      totalOrders,
      totalRevenue,
      totalUsers,
      totalBooks,
      recentOrders,
      periodOrders,
      periodRevenue,
      userStats,
      topBooks,
      monthlySales,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: 'paid' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      User.countDocuments({ role: 'user' }),
      Book.countDocuments({ status: 'published' }),
      Order.find().sort({ createdAt: -1 }).limit(10).lean(),
      Order.countDocuments({ createdAt: { $gte: startDate } }),
      Order.aggregate([
        { $match: { paymentStatus: 'paid', createdAt: { $gte: startDate } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      User.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Book.find({ status: 'published' }).sort({ soldCount: -1 }).limit(5).lean(),
      Order.aggregate([
        {
          $match: { paymentStatus: 'paid', createdAt: { $gte: new Date(now.getFullYear(), 0, 1) } },
        },
        {
          $group: {
            _id: { month: { $month: '$createdAt' } },
            revenue: { $sum: '$totalAmount' },
            orders: { $sum: 1 },
          },
        },
        { $sort: { '_id.month': 1 } },
      ]),
    ]);

    // Format monthly sales for chart
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedMonthlySales = monthNames.map((month, idx) => {
      const found = monthlySales.find((m: any) => m._id.month === idx + 1);
      return { month, revenue: found?.revenue || 0, orders: found?.orders || 0 };
    });

    // Profit/Loss (simplified - revenue - 60% assumed cost)
    const profitLoss = formattedMonthlySales.map((m) => ({
      ...m,
      profit: Math.round(m.revenue * 0.4),
      loss: Math.round(m.revenue * 0.1),
    }));

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        totalBooks,
        periodOrders,
        periodRevenue: periodRevenue[0]?.total || 0,
      },
      recentOrders,
      userStats,
      topBooks,
      monthlySales: formattedMonthlySales,
      profitLoss,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
