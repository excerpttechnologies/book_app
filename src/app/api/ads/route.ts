import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ad from '@/models/Ad';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const position = searchParams.get('position');
    const page = searchParams.get('page') || 'home';
    const adminView = searchParams.get('admin') === 'true';

    const session = await getServerSession(authOptions);

    const query: Record<string, unknown> = {};
    if (!adminView || session?.user?.role !== 'admin') {
      query.status = 'active';
      const now = new Date();
      query.$or = [
        { startDate: { $exists: false } },
        { startDate: { $lte: now } },
      ];
    }
    if (position) query.position = position;

    const ads = await Ad.find(query).sort({ priority: -1, createdAt: -1 }).lean();
    return NextResponse.json({ ads });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    const ad = await Ad.create(body);
    return NextResponse.json({ ad }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}
