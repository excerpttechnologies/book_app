'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiDownload, FiEye, FiCreditCard, FiPackage, FiCheckCircle, FiTruck, FiClock } from 'react-icons/fi';

const STATUS_STYLES: Record<string, { color: string; bg: string; icon: any }> = {
  placed: { color: 'var(--gold)', bg: 'var(--gold-light)', icon: FiPackage },
  confirmed: { color: 'var(--green)', bg: 'var(--green-light)', icon: FiCheckCircle },
  processing: { color: '#6B5CE7', bg: '#EDE9FF', icon: FiClock },
  shipped: { color: '#0891B2', bg: '#E0F7FA', icon: FiTruck },
  delivered: { color: 'var(--green)', bg: 'var(--green-light)', icon: FiCheckCircle },
  cancelled: { color: 'var(--accent)', bg: 'var(--accent-light)', icon: FiClock },
};

function OrdersContent() {
  const { data: session } = useSession();
  const sp = useSearchParams();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetch('/api/orders').then(r => r.json()).then(d => { setOrders(d.orders || []); setLoading(false); });
    const newId = sp.get('new');
    if (newId) toast.success('Order placed successfully! 🎉');
  }, [session]);

  const payNow = async (order: any) => {
    const rpRes = await fetch('/api/payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount: order.totalAmount }) });
    const { order: rpOrder } = await rpRes.json();
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: rpOrder.amount,
      currency: 'INR',
      name: 'Saraswati Books',
      order_id: rpOrder.id,
      prefill: { name: session?.user?.name, email: session?.user?.email },
      handler: async (response: any) => {
        await fetch('/api/payment/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...response, orderId: order._id }) });
        toast.success('Payment successful!');
        setOrders(o => o.map(x => x._id === order._id ? { ...x, paymentStatus: 'paid' } : x));
      },
      theme: { color: '#B5451B' },
    };
    new (window as any).Razorpay(options).open();
  };

  if (!session) return <div style={{ padding: 60, textAlign: 'center' }}><p>Please sign in to view orders</p></div>;
  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><div className="spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 20px' }}>
      <h1 style={{ fontSize: '1.8rem', marginBottom: 28 }}>My Orders</h1>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16 }}>📦</div>
          <h3 style={{ marginBottom: 8 }}>No orders yet</h3>
          <Link href="/shop" className="btn-primary" style={{ display: 'inline-flex', marginTop: 16 }}>Start Shopping</Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {orders.map(order => {
            const st = STATUS_STYLES[order.orderStatus] || STATUS_STYLES.placed;
            const Icon = st.icon;
            return (
              <div key={order._id} className="card" style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Order ID</div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{order.orderId}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 50, background: st.bg, color: st.color, fontSize: 13, fontWeight: 600 }}>
                      <Icon size={13} /> {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                    <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-green' : 'badge-gold'}`}>
                      {order.paymentStatus === 'paid' ? '✓ Paid' : 'Payment Pending'}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
                  {order.items.map((item: any) => (
                    <div key={item.bookId} style={{ display: 'flex', gap: 10, alignItems: 'center', background: 'var(--bg-secondary)', borderRadius: 8, padding: '8px 12px', minWidth: 0 }}>
                      <img src={item.image || ''} alt={item.title} style={{ width: 36, height: 48, objectFit: 'cover', borderRadius: 4 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/36x48/f5efe6/b5451b?text=B'; }} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 160 }}>{item.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Qty: {item.quantity} · ₹{item.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Admin note */}
                {order.adminNote && (
                  <div style={{ background: 'var(--gold-light)', borderRadius: 8, padding: '8px 12px', fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12 }}>
                    📝 <strong>Note from us:</strong> {order.adminNote}
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>Total: ₹{order.totalAmount}</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {order.paymentStatus === 'pending' && order.paymentMethod === 'pay_later' && (
                      <button onClick={() => payNow(order)} className="btn-gold" style={{ padding: '7px 14px', fontSize: 13 }}>
                        <FiCreditCard size={13} /> Pay Now
                      </button>
                    )}
                    {order.invoiceEnabled && (
                      <Link href={`/orders/${order._id}/invoice`} className="btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}>
                        <FiDownload size={13} /> Download Invoice
                      </Link>
                    )}
                    <Link href={`/orders/${order._id}`} className="btn-secondary" style={{ padding: '7px 14px', fontSize: 13 }}>
                      <FiEye size={13} /> View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function OrdersPage() {
  return <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}><OrdersContent /></Suspense>;
}
