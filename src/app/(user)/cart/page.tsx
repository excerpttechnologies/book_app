'use client';
import { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';

export default function CartPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { setLoading(false); return; }
    fetch('/api/cart').then(r => r.json()).then(d => { setCart(d.cart || []); setLoading(false); });
  }, [session]);

  const updateQty = async (bookId: string, qty: number) => {
    const r = await fetch('/api/cart', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookId, quantity: qty }) });
    if (r.ok) {
      if (qty === 0) setCart(cart.filter(i => i.bookId !== bookId));
      else setCart(cart.map(i => i.bookId === bookId ? { ...i, quantity: qty } : i));
    }
  };

  const remove = async (bookId: string) => {
    await fetch('/api/cart', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ bookId }) });
    setCart(cart.filter(i => i.bookId !== bookId));
    toast.success('Removed from cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.book?.price || 0) * item.quantity, 0);

  if (!session) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
        <h2 style={{ marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Please sign in to view your cart</p>
        <button onClick={() => signIn('google')} className="btn-primary">Sign in with Google</button>
      </div>
    );
  }

  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><div className="spinner" style={{ width: 40, height: 40, margin: '0 auto' }} /></div>;

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: 20, textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: 16 }}>🛒</div>
        <h2 style={{ marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Browse our collection and add books you love</p>
        <Link href="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 28 }}>Shopping Cart ({cart.length} items)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)', gap: 28 }}>
        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {cart.map(item => (
            <div key={item.bookId} className="card" style={{ padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <Link href={`/book/${item.bookId}`}>
                <img
                  src={item.book?.images?.[0] || 'https://placehold.co/80x107/f5efe6/b5451b?text=Book'}
                  alt={item.book?.title}
                  style={{ width: 80, aspectRatio: '3/4', objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                  onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/80x107/f5efe6/b5451b?text=Book'; }}
                />
              </Link>
              <div style={{ flex: 1 }}>
                <Link href={`/book/${item.bookId}`}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 4, fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}>{item.book?.title}</h3>
                </Link>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>by {item.book?.author}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
                    <button onClick={() => updateQty(item.bookId, item.quantity - 1)} style={{ width: 30, height: 30, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', fontSize: 16 }}>−</button>
                    <span style={{ width: 36, textAlign: 'center', fontSize: 14, fontWeight: 500 }}>{item.quantity}</span>
                    <button onClick={() => updateQty(item.bookId, item.quantity + 1)} style={{ width: 30, height: 30, background: 'var(--bg-secondary)', border: 'none', cursor: 'pointer', fontSize: 16 }}>+</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700 }}>₹{(item.book?.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => remove(item.bookId)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', padding: 4 }}>
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="card" style={{ padding: 24, position: 'sticky', top: 90 }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: 20, fontFamily: 'var(--font-body)', fontWeight: 600 }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cart.length} items)</span>
                <span style={{ fontWeight: 500 }}>₹{subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Calculated at checkout</span>
              </div>
              <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700 }}>
                <span>Total</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ background: 'var(--gold-light)', borderRadius: 8, padding: '10px 12px', fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.6 }}>
              🚚 Delivery charges will be added at dispatch. Our team will contact you.
            </div>

            <button onClick={() => router.push('/checkout')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.95rem' }}>
              Proceed to Checkout <FiArrowRight size={16} />
            </button>
            <Link href="/shop" style={{ display: 'flex', justifyContent: 'center', marginTop: 12, fontSize: 13, color: 'var(--text-muted)' }}>
              <FiShoppingBag size={14} style={{ marginRight: 6 }} /> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
