import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Ad from '@/models/Ad';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const ad = await Ad.findByIdAndUpdate(id, await req.json(), { new: true });
    return NextResponse.json({ ad });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    await Ad.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Ad deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
  }
}