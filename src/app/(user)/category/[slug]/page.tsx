'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BookCard from '@/components/user/BookCard';

const SLUG_TO_CATEGORY: Record<string, string> = {
  'books': 'Books',
  'god-photos': 'God Photos',
  'framed-calendar': 'Framed Calendar',
  'wall-hanging': 'Wall Hanging',
  'musical-box': 'Musical Box',
  'other-items': 'Other Items',
};

export default function CategoryPage() {
  const { slug } = useParams();
  const category = SLUG_TO_CATEGORY[slug as string] || (slug as string);
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/books?category=${encodeURIComponent(category)}&limit=40`)
      .then(r => r.json())
      .then(d => { setBooks(d.books || []); setTotal(d.pagination?.total || 0); setLoading(false); });
  }, [category]);

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px' }}>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 6 }}>{category}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{total} items found</p>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ borderRadius: 'var(--radius)', overflow: 'hidden', background: 'var(--surface)', border: '1px solid var(--border)', aspectRatio: '3/4' }} />
          ))}
        </div>
      ) : books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>📚</div>
          <h3>No items in this category yet</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {books.map(book => <BookCard key={book._id} book={book} />)}
        </div>
      )}
    </div>
  );
}
