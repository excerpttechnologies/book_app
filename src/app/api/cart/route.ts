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
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    // Populate book details
    const cartItems = await Promise.all(
      (user as any).cart.map(async (item: any) => {
        const book = await Book.findById(item.bookId).lean();
        return book ? { ...item, book } : null;
      })
    );

    return NextResponse.json({ cart: cartItems.filter(Boolean) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { bookId, quantity = 1 } = await req.json();

    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const existingIndex = user.cart.findIndex((item: any) => item.bookId === bookId);
    if (existingIndex >= 0) {
      user.cart[existingIndex].quantity += quantity;
    } else {
      user.cart.push({ bookId, quantity, addedAt: new Date() });
    }
    await user.save();
    return NextResponse.json({ message: 'Added to cart', cart: user.cart });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { bookId, quantity } = await req.json();

    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const itemIndex = user.cart.findIndex((item: any) => item.bookId === bookId);
    if (itemIndex >= 0) {
      if (quantity <= 0) {
        user.cart.splice(itemIndex, 1);
      } else {
        user.cart[itemIndex].quantity = quantity;
      }
    }
    await user.save();
    return NextResponse.json({ cart: user.cart });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { bookId } = await req.json();
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
    user.cart = user.cart.filter((item: any) => item.bookId !== bookId);
    await user.save();
    return NextResponse.json({ cart: user.cart });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}
