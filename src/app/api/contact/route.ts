import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (type) query.type = type;
    const [contacts, total] = await Promise.all([
      Contact.find(query).sort({ createdAt: -1 }).skip((page-1)*limit).limit(limit).lean(),
      Contact.countDocuments(query),
    ]);
    return NextResponse.json({ contacts, pagination: { page, limit, total, pages: Math.ceil(total/limit) } });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const body = await req.json();
    if (session) {
      body.userId = session.user.id;
      body.userEmail = session.user.email;
      body.userName = session.user.name;
    }
    const contact = await Contact.create(body);
    return NextResponse.json({ contact }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}
