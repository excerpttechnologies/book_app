import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Book from '@/models/Book';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const language = searchParams.get('language');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const bestSeller = searchParams.get('bestSeller');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const query: Record<string, unknown> = {};

    if (category) query.category = category;
    if (language) query.bookLanguage = language;
    if (featured === 'true') query.featured = true;
    if (bestSeller === 'true') query.bestSeller = true;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) (query.price as Record<string, number>).$gte = parseFloat(minPrice);
      if (maxPrice) (query.price as Record<string, number>).$lte = parseFloat(maxPrice);
    }

    // For public API, only show published books unless admin
    const session = await getServerSession(authOptions);
    if (!session?.user?.role || session.user.role !== 'admin') {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const sortObj: any = { [sort]: order === 'asc' ? 1 : -1 };
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      Book.find(query).sort(sortObj).skip(skip).limit(limit).lean(),
      Book.countDocuments(query),
    ]);

    return NextResponse.json({
      books,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
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

    // Calculate discount if originalPrice provided
    if (body.originalPrice && body.price) {
      body.discount = Math.round(((body.originalPrice - body.price) / body.originalPrice) * 100);
    }

    const book = await Book.create(body);
    return NextResponse.json({ book }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}
