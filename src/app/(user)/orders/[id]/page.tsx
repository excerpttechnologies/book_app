'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiPackage } from 'react-icons/fi';

const STATUS_STEPS = ['placed','confirmed','processing','shipped','delivered'];

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch(`/api/orders/${id}`).then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([o, s]) => {
      setOrder(o.order);
      setSettings(s.settings);
      setLoading(false);
    });
  }, [id]);

  const downloadInvoice = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const s = settings || {};
      doc.setFillColor(181, 69, 27);
      doc.rect(0, 0, 210, 30, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.text(s.invoiceName || 'Saraswati Books', 14, 18);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Invoice: ${order.orderId}`, 14, 42);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 50);
      let y = 65;
      const addr = order.billingAddress || {};
      doc.setFont('helvetica', 'bold');
      doc.text('Bill To:', 14, y); y += 7;
      doc.setFont('helvetica', 'normal');
      doc.text(`${addr.firstName} ${addr.lastName}`, 14, y); y += 6;
      doc.text(`${addr.addressLine1}`, 14, y); y += 6;
      doc.text(`${addr.city}, ${addr.state} - ${addr.pincode}`, 14, y); y += 14;
      doc.setFont('helvetica', 'bold');
      doc.text('Items:', 14, y); y += 8;
      doc.setFont('helvetica', 'normal');
      order.items?.forEach((item: any) => {
        doc.text(`${item.title} x${item.quantity} = Rs.${item.price * item.quantity}`, 14, y); y += 7;
      });
      y += 4;
      doc.setFont('helvetica', 'bold');
      doc.text(`Total: Rs.${order.totalAmount}`, 14, y);
      if (s.invoiceNote) { y += 14; doc.setFont('helvetica', 'normal'); doc.setFontSize(9); doc.text(`Note: ${s.invoiceNote}`, 14, y); }
      doc.save(`invoice_${order.orderId}.pdf`);
    } catch (err) { alert('Failed to download invoice'); }
  };

  if (loading) return <div style={{ padding: 60, textAlign: 'center' }}><div className="spinner" style={{ width: 36, height: 36, margin: '0 auto' }} /></div>;
  if (!order) return <div style={{ padding: 60, textAlign: 'center' }}><h2>Order not found</h2></div>;

  const currentStep = STATUS_STEPS.indexOf(order.orderStatus);

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 20px' }}>
      <Link href="/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, marginBottom: 24 }}>
        <FiArrowLeft size={16} /> Back to Orders
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 4 }}>Order #{order.orderId}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        {order.invoiceEnabled && (
          <button onClick={downloadInvoice} className="btn-primary">
            <FiDownload size={15} /> Download Invoice
          </button>
        )}
      </div>

      {/* Status tracker */}
      {!['cancelled','returned'].includes(order.orderStatus) && (
        <div className="card" style={{ padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, left: '10%', right: '10%', height: 2, background: 'var(--border)' }} />
            <div style={{ position: 'absolute', top: 18, left: '10%', height: 2, background: 'var(--accent)', width: `${Math.max(0, currentStep) * 25}%`, transition: 'width 0.5s' }} />
            {STATUS_STEPS.map((step, i) => (
              <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: i <= currentStep ? 'var(--accent)' : 'var(--bg-secondary)', border: `2px solid ${i <= currentStep ? 'var(--accent)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: i <= currentStep ? '#fff' : 'var(--text-muted)', transition: 'all 0.3s' }}>
                  <FiPackage size={14} />
                </div>
                <span style={{ fontSize: 11, fontWeight: i <= currentStep ? 600 : 400, color: i <= currentStep ? 'var(--accent)' : 'var(--text-muted)', textTransform: 'capitalize' }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Items */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 16 }}>Items Ordered</h2>
            {order.items?.map((item: any) => (
              <div key={item.bookId} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <img src={item.image} alt={item.title} style={{ width: 52, height: 68, objectFit: 'cover', borderRadius: 6 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/52x68/f5efe6/b5451b?text=B'; }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>by {item.author}</div>
                  <div style={{ fontSize: 13, marginTop: 4 }}>Qty: {item.quantity} × ₹{item.price} = <strong>₹{item.price * item.quantity}</strong></div>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', fontWeight: 700, fontSize: '1rem' }}>
              <span>Total</span><span>₹{order.totalAmount}</span>
            </div>
          </div>

          {/* Status history */}
          {order.statusHistory?.length > 0 && (
            <div className="card" style={{ padding: 20 }}>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 14 }}>Status History</h2>
              {order.statusHistory.map((h: any, i: number) => (
                <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13, textTransform: 'capitalize' }}>{h.status}</div>
                    {h.note && <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{h.note}</div>}
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(h.date).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Billing */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 14 }}>Billing Address</h2>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <strong>{order.billingAddress?.firstName} {order.billingAddress?.lastName}</strong><br />
              {order.billingAddress?.addressLine1}<br />
              {order.billingAddress?.addressLine2 && <>{order.billingAddress.addressLine2}<br /></>}
              {order.billingAddress?.city}, {order.billingAddress?.state} - {order.billingAddress?.pincode}<br />
              📞 {order.billingAddress?.phone}<br />
              ✉️ {order.billingAddress?.email}
            </div>
          </div>

          {/* Payment */}
          <div className="card" style={{ padding: 20 }}>
            <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600, marginBottom: 14 }}>Payment Info</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Method', order.paymentMethod === 'razorpay' ? 'Razorpay' : 'Pay Later'],
                ['Status', order.paymentStatus],
                ['Subtotal', `₹${order.subtotal}`],
                order.shippingCharge && ['Shipping', `₹${order.shippingCharge}`],
                order.distanceCharge && ['Distance', `₹${order.distanceCharge}`],
                ['Total', `₹${order.totalAmount}`],
              ].filter(Boolean).map(([label, value]: any) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{label}</span>
                  <span style={{ fontWeight: label === 'Total' ? 700 : 400 }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Admin note */}
          {order.adminNote && (
            <div style={{ background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--gold)', marginBottom: 6 }}>📝 Note from us</div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{order.adminNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
