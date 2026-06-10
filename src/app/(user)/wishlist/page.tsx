'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import BookCard from '@/components/user/BookCard';
import Link from 'next/link';

export default function WishlistPage() {
  const { data: session } = useSession();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { setLoading(false); return; }
    fetch('/api/wishlist').then(r => r.json()).then(d => { setBooks(d.wishlist || []); setLoading(false); });
  }, [session]);

  if (!session) return (
    <div style={{ maxWidth: 600, margin: '80px auto', padding: 20, textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: 16 }}>❤️</div>
      <h2 style={{ marginBottom: 12 }}>Your Wishlist</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Sign in to save your favourite books</p>
      <button onClick={() => signIn('google')} className="btn-primary">Sign in with Google</button>
    </div>
  );

  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><div className="spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 28 }}>My Wishlist ({books.length})</h1>
      {books.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>❤️</div>
          <h3 style={{ marginBottom: 8 }}>Your wishlist is empty</h3>
          <Link href="/shop" className="btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>Browse Books</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
          {books.map(book => <BookCard key={book._id} book={book} />)}
        </div>
      )}
    </div>
  );
}
