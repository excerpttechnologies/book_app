'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiDownload, FiToggleLeft, FiToggleRight, FiSearch } from 'react-icons/fi';

export default function AdminInvoicesPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings));
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20', paymentStatus: 'paid', ...(search && { search }) });
    fetch(`/api/orders?${params}`).then(r => r.json()).then(d => {
      setOrders(d.orders || []);
      setTotal(d.pagination?.total || 0);
      setLoading(false);
    });
  };

  useEffect(() => { fetchOrders(); }, [page, search]);

  const toggleInvoice = async (orderId: string, currentEnabled: boolean, distanceCharge: number) => {
    const r = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ invoiceEnabled: !currentEnabled }),
    });
    if (r.ok) {
      toast.success(!currentEnabled ? 'Invoice enabled for user!' : 'Invoice disabled');
      fetchOrders();
    }
  };

  const updateDistance = async (orderId: string, distance: string) => {
    await fetch(`/api/orders/${orderId}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ distanceCharge: parseFloat(distance) || 0 }),
    });
    toast.success('Distance charge updated');
    fetchOrders();
  };

  const generateInvoicePDF = async (order: any) => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      const s = settings || {};

      // Header
      doc.setFillColor(181, 69, 27);
      doc.rect(0, 0, 210, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.text(s.invoiceName || 'OM Spiritual Books', 14, 18);
      doc.setFontSize(10);
      doc.text('INVOICE', 170, 18);
      doc.setTextColor(0, 0, 0);

      // Invoice details
      doc.setFontSize(10);
      doc.text(`Invoice #: ${order.orderId}`, 14, 48);
      doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 55);
      doc.text(`Payment: ${order.razorpayPaymentId || 'N/A'}`, 14, 62);

      // Customer
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Bill To:', 14, 78);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const addr = order.billingAddress || {};
      doc.text(`${addr.firstName || ''} ${addr.lastName || ''}`, 14, 86);
      doc.text(`${addr.addressLine1 || ''}`, 14, 92);
      if (addr.addressLine2) doc.text(addr.addressLine2, 14, 98);
      doc.text(`${addr.city || ''}, ${addr.state || ''} - ${addr.pincode || ''}`, 14, 104);
      doc.text(`Phone: ${addr.phone || ''}`, 14, 110);
      doc.text(`Email: ${addr.email || ''}`, 14, 116);
      if (addr.gstin) doc.text(`GSTIN: ${addr.gstin}`, 14, 122);

      // Items table header
      let y = 136;
      doc.setFillColor(245, 239, 230);
      doc.rect(14, y - 6, 182, 10, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text('Book Title', 16, y);
      doc.text('Author', 90, y);
      doc.text('Qty', 140, y);
      doc.text('Price', 155, y);
      doc.text('Total', 175, y);
      doc.setFont('helvetica', 'normal');
      y += 12;

      order.items?.forEach((item: any) => {
        if (y > 260) { doc.addPage(); y = 20; }
        doc.text(item.title?.substring(0, 35) || '', 16, y);
        doc.text(item.author?.substring(0, 20) || '', 90, y);
        doc.text(String(item.quantity), 142, y);
        doc.text(`Rs.${item.price}`, 155, y);
        doc.text(`Rs.${item.price * item.quantity}`, 175, y);
        y += 8;
        doc.setDrawColor(232, 221, 208);
        doc.line(14, y - 3, 196, y - 3);
      });

      // Totals
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.text(`Subtotal:`, 140, y); doc.text(`Rs.${order.subtotal}`, 175, y); y += 8;
      if (order.shippingCharge) { doc.text(`Shipping:`, 140, y); doc.text(`Rs.${order.shippingCharge}`, 175, y); y += 8; }
      if (order.distanceCharge) { doc.text(`Distance:`, 140, y); doc.text(`Rs.${order.distanceCharge}`, 175, y); y += 8; }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(`Total:`, 140, y); doc.text(`Rs.${order.totalAmount}`, 175, y);

      // Bank details
      if (s.bankName) {
        y += 20;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.text('Payment Details:', 14, y);
        doc.setFont('helvetica', 'normal');
        y += 7;
        if (s.bankName) { doc.text(`Bank: ${s.bankName}`, 14, y); y += 6; }
        if (s.bankAccountNumber) { doc.text(`Account: ${s.bankAccountNumber}`, 14, y); y += 6; }
        if (s.bankIFSC) { doc.text(`IFSC: ${s.bankIFSC}`, 14, y); y += 6; }
        if (s.upiId) { doc.text(`UPI: ${s.upiId}`, 14, y); y += 6; }
      }

      // Terms
      if (s.invoiceTerms) {
        y += 10;
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
        doc.text('Terms & Conditions:', 14, y); y += 6;
        const lines = doc.splitTextToSize(s.invoiceTerms, 182);
        doc.text(lines, 14, y);
      }

      // Note
      if (s.invoiceNote) {
        y += 16;
        doc.setFontSize(9);
        doc.text(`Note: ${s.invoiceNote}`, 14, y);
      }

      // Footer
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('Thank you for your purchase!', 105, 285, { align: 'center' });

      doc.save(`invoice_${order.orderId}.pdf`);
      toast.success('Invoice downloaded!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to generate invoice');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Invoice Management ({total})</h1>
      </div>

      <div style={{ background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: 14, color: 'var(--text-secondary)' }}>
        💡 <strong>How it works:</strong> After an order is paid, review it here. Add any distance charges, then enable the invoice download button for the user. The user will then see a "Download Invoice" button in their orders.
      </div>

      <div className="card" style={{ padding: '14px 16px', marginBottom: 20 }}>
        <div style={{ position: 'relative', maxWidth: 300 }}>
          <FiSearch size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Distance Charge (₹)</th>
                <th>Invoice Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={6}><div style={{ height: 20, background: 'var(--bg-secondary)', borderRadius: 4 }} /></td></tr>) :
                orders.map(order => (
                  <tr key={order._id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{order.orderId}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{order.userName}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{order.userEmail}</div>
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{order.totalAmount}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <input
                          type="number"
                          defaultValue={order.distanceCharge || 0}
                          className="input"
                          style={{ width: 80, padding: '6px 10px', fontSize: 13 }}
                          onBlur={e => updateDistance(order._id, e.target.value)}
                        />
                      </div>
                    </td>
                    <td>
                      <button onClick={() => toggleInvoice(order._id, order.invoiceEnabled, order.distanceCharge)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', background: order.invoiceEnabled ? 'var(--green-light)' : 'var(--bg-secondary)', color: order.invoiceEnabled ? 'var(--green)' : 'var(--text-muted)', fontSize: 13, fontWeight: 500 }}>
                        {order.invoiceEnabled ? <FiToggleRight size={16} /> : <FiToggleLeft size={16} />}
                        {order.invoiceEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </td>
                    <td>
                      <button onClick={() => generateInvoicePDF(order)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: 12 }}>
                        <FiDownload size={13} /> Preview PDF
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {total > 20 && (
          <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'center', gap: 8 }}>
            {[...Array(Math.ceil(total / 20))].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid', borderColor: page === i+1 ? 'var(--accent)' : 'var(--border)', background: page === i+1 ? 'var(--accent)' : 'var(--surface)', color: page === i+1 ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontSize: 13 }}>{i + 1}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
