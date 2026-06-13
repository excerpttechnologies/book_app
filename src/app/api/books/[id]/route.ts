import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("PARAM ID:", id);

    const book = await Book.findById(id);

    console.log("BOOK FOUND:", book);

    if (!book) {
      return NextResponse.json(
        {
          error: "Book not found",
          receivedId: id,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ book });
  } catch (error) {
    console.error("BOOK ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch book" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ← await first
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    const body = await req.json();
    if (body.originalPrice && body.price) {
      body.discount = Math.round(((body.originalPrice - body.price) / body.originalPrice) * 100);
    }
    const book = await Book.findByIdAndUpdate(id, body, { new: true }); // ← use id
    if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    return NextResponse.json({ book });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // ← await first
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    await connectDB();
    await Book.findByIdAndDelete(id); // ← use id, not params.id
    return NextResponse.json({ message: 'Book deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
}
