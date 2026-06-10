import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await req.json();

    if (body.adminReply) {
      body.repliedAt = new Date();
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json({ contact });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update' },
      { status: 500 }
    );
  }
}