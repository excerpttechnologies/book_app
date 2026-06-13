import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const userId = session.user.role === 'admin' ? id : session.user.id;
    const user = await User.findById(userId).select('-password').lean();
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    if (session.user.role === 'admin') {
      const user = await User.findByIdAndUpdate(id, body, { new: true }).select('-password');
      return NextResponse.json({ user });
    } else {
      if (id !== session.user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
      const allowed = ['name', 'phone', 'addresses', 'image'];
      const filtered: Record<string, unknown> = {};
      allowed.forEach((k) => { if (body[k] !== undefined) filtered[k] = body[k]; });
      const user = await User.findByIdAndUpdate(id, filtered, { new: true }).select('-password');
      return NextResponse.json({ user });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}