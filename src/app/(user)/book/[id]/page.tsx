'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiShoppingCart, FiHeart, FiStar, FiArrowLeft, FiPackage, FiZap } from 'react-icons/fi';

export default function BookDetailPage() {
  const { id } = useParams();
  console.log("ID FROM URL:", id);
  const router = useRouter();
  const { data: session } = useSession();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [addingCart, setAddingCart] = useState(false);

  useEffect(() => {
    fetch(`/api/books/${id}`).then(r => r.json()).then(d => { setBook(d.book); setLoading(false); }).catch(() => setLoading(false));
  }, [id]);

  const addToCart = async () => {
    if (!session) { signIn('google'); return; }
    setAddingCart(true);
    const r = await fetch('/api/cart', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookId: book._id, quantity: qty }) });
    if (r.ok) { toast.success('Added to cart!'); } else { toast.error('Failed'); }
    setAddingCart(false);
  };

  const buyNow = async () => {
    if (!session) { signIn('google'); return; }
    await addToCart();
    router.push('/cart');
  };

  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><div className="spinner" style={{ width: 40, height: 40, margin: '0 auto' }} /></div>;
  if (!book) return <div style={{ padding: 60, textAlign: 'center' }}><h2>Book not found</h2><Link href="/shop" className="btn-primary" style={{ marginTop: 16, display: 'inline-flex' }}>Back to Shop</Link></div>;

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 20px' }}>
      <Link href="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
        <FiArrowLeft size={16} /> Back to Shop
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.5fr)', gap: 48 }}>
        {/* Images */}
        <div>
          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: 12, background: 'var(--surface)' }}>
            <img
              src={book.images?.[selectedImage] || 'https://placehold.co/400x530/f5efe6/b5451b?text=Book'}
              alt={book.title}
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
              onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/400x530/f5efe6/b5451b?text=Book'; }}
            />
          </div>
          {book.images?.length > 1 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {book.images.map((img: string, i: number) => (
                <button key={i} onClick={() => setSelectedImage(i)}
                  style={{ width: 70, aspectRatio: '3/4', borderRadius: 8, overflow: 'hidden', border: `2px solid ${selectedImage === i ? '#1F3A52' : 'var(--border)'}`, cursor: 'pointer', padding: 0 }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/70x93/f5efe6/b5451b?text='; }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span className="badge badge-gold">{book.language}</span>
            <span className="badge badge-gray">{book.category}</span>
            {book.expressShipping && <span className="badge badge-green">⚡ Express Shipping</span>}
          </div>

          <h1 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', marginBottom: 8, lineHeight: 1.3 }}>{book.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, marginBottom: 16 }}>by <strong style={{ color: 'var(--text-secondary)' }}>{book.author}</strong></p>

          {/* Rating */}
          {book.rating > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, padding: '8px 12px', background: 'var(--gold-light)', borderRadius: 8 }}>
              {[...Array(5)].map((_, i) => <FiStar key={i} size={14} fill={i < Math.round(book.rating) ? 'var(--gold)' : 'none'} color="var(--gold)" />)}
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gold)' }}>{book.rating.toFixed(1)}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>({book.reviewCount} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: '2rem', fontWeight: 700 }}>₹{book.price}</span>
            {book.originalPrice && <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>₹{book.originalPrice}</span>}
            {book.discount > 0 && <span className="badge badge-red" style={{ fontSize: 14 }}>{book.discount}% OFF</span>}
          </div>

          {/* Stock */}
          <p style={{ fontSize: 14, marginBottom: 16, color: book.stock > 0 ? 'var(--green)' : '#1F3A52' }}>
            {book.stock > 0 ? `✓ In Stock (${book.stock} available)` : '✗ Out of Stock'}
          </p>

          {/* Shipping */}
          {book.shippingCharge != null && (
            <div style={{ padding: '10px 14px', background: 'var(--bg-secondary)', borderRadius: 8, fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiPackage size={14} />
              Includes ₹{book.shippingCharge} shipping & handling
            </div>
          )}

          {/* Qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <label className="label" style={{ margin: 0 }}>Quantity:</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 36, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-secondary)' }}>−</button>
              <span style={{ width: 40, textAlign: 'center', fontSize: 15, fontWeight: 500 }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(book.stock, q + 1))} style={{ width: 36, height: 36, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-secondary)' }}>+</button>
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <button onClick={addToCart} className="btn-secondary" disabled={addingCart || book.stock === 0} style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}>
              <FiShoppingCart size={16} /> {addingCart ? 'Adding...' : 'Add to Cart'}
            </button>
            <button onClick={buyNow} className="btn-primary" disabled={book.stock === 0} style={{ flex: 1, justifyContent: 'center', minWidth: 140 }}>
              <FiZap size={16} /> Buy Now
            </button>
          </div>

          {/* Details */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 14, fontFamily: 'var(--font-body)', fontWeight: 600 }}>Book Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px' }}>
              {[
                ['Publisher', book.publisher],
                ['Language', book.language],
                ['Pages', book.pages],
                ['ISBN', book.isbn],
                ['Year', book.publicationYear],
                ['Category', book.category],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={String(k)}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{k}</span>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginTop: 2 }}>{String(v)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {book.description && (
        <div style={{ marginTop: 48, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: 16 }}>About This Book</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.8, maxWidth: 800 }}
            dangerouslySetInnerHTML={{ __html: book.description.replace(/\n/g, '<br/>') }} />
        </div>
      )}
    </div>
  );
}
