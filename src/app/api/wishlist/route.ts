import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Book from '@/models/Book';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const user = await User.findById(session.user.id).lean();
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const books = await Book.find({ _id: { $in: (user as any).wishlist } }).lean();
    return NextResponse.json({ wishlist: books });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { bookId } = await req.json();
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    if (!user.wishlist.includes(bookId)) {
      user.wishlist.push(bookId);
      await user.save();
    }
    return NextResponse.json({ message: 'Added to wishlist' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { bookId } = await req.json();
    await User.findByIdAndUpdate(session.user.id, { $pull: { wishlist: bookId } });
    return NextResponse.json({ message: 'Removed from wishlist' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
