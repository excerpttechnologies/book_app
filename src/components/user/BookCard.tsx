'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useSession, signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  language: string;
  category: string;
  rating: number;
  shippingCharge?: number;
  expressShipping?: boolean;
  stock: number;
}

export default function BookCard({ book }: { book: Book }) {
  const { data: session } = useSession();
  const [wishlisted, setWishlisted] = useState(false);
  const [addingCart, setAddingCart] = useState(false);

  const addToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) { signIn('google'); return; }
    setAddingCart(true);
    try {
      const r = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId: book._id, quantity: 1 }),
      });
      if (r.ok) toast.success('Added to cart!');
    } catch { toast.error('Failed to add'); }
    finally { setAddingCart(false); }
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!session) { signIn('google'); return; }
    try {
      if (wishlisted) {
        await fetch('/api/wishlist', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookId: book._id }) });
        toast.success('Removed from wishlist');
      } else {
        await fetch('/api/wishlist', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookId: book._id }) });
        toast.success('Added to wishlist!');
      }
      setWishlisted(!wishlisted);
    } catch { toast.error('Failed'); }
  };

  return (
    <Link href={`/book/${book._id}`} style={{ display: 'block' }}>
      <div className="book-card" style={{ position: 'relative' }}>
        {/* Discount Badge */}
        {book.discount && book.discount > 0 && (
          <div style={{ position: 'absolute', top: 10, left: 10, background: '#1F3A52', color: '#fff', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600, zIndex: 2 }}>
            {book.discount}% OFF
          </div>
        )}
        {/* Wishlist */}
        <button onClick={toggleWishlist} style={{ position: 'absolute', top: 10, right: 10, background: wishlisted ? '#1F3A52' : 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <FiHeart size={15} color={wishlisted ? '#fff' : '#1F3A52'} fill={wishlisted ? '#fff' : 'none'} />
        </button>

        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={book.images?.[0] || '/placeholder-book.jpg'}
            alt={book.title}
            style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', transition: 'transform 0.3s' }}
            onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/300x400/f5efe6/b5451b?text=Book'; }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: '12px 14px 14px' }}>
          <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
            {book.language} · {book.category}
          </div>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 3, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', fontFamily: 'var(--font-body)' }}>
            {book.title}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>by {book.author}</p>

          {/* Rating */}
          {book.rating > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
              <FiStar size={12} fill="var(--gold)" color="var(--gold)" />
              <span style={{ fontSize: 12, color: 'var(--text-secondary)', fontWeight: 500 }}>{book.rating.toFixed(1)}</span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>₹{book.price}</span>
            {book.originalPrice && <span style={{ fontSize: 13, color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{book.originalPrice}</span>}
          </div>

          {/* Shipping note */}
          {book.shippingCharge != null && (
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 10 }}>
              {book.expressShipping ? '⚡ Express Shipping' : `Incl. ₹${book.shippingCharge} shipping`}
            </p>
          )}

          <button
            onClick={addToCart}
            className="btn-primary"
            disabled={addingCart || book.stock === 0}
            style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: 13 }}
          >
            <FiShoppingCart size={14} />
            {book.stock === 0 ? 'Out of Stock' : addingCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}
