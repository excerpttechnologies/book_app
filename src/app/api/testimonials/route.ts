import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const adminView = searchParams.get('admin') === 'true';
    const session = await getServerSession(authOptions);

    const query: Record<string, unknown> = {};
    if (!adminView || session?.user?.role !== 'admin') {
      query.status = 'active';
    }

    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ testimonials });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const testimonial = await Testimonial.create(await req.json());
    return NextResponse.json({ testimonial }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
