'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSearch, FiEye, FiX, FiSave } from 'react-icons/fi';

const ORDER_STATUSES = ['placed','confirmed','processing','shipped','delivered','cancelled','returned'];
const STATUS_COLORS: Record<string,string> = { placed:'badge-gold', confirmed:'badge-green', processing:'badge-gray', shipped:'badge-gray', delivered:'badge-green', cancelled:'badge-red', returned:'badge-red' };

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editNote, setEditNote] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editPayStatus, setEditPayStatus] = useState('');
  const [editDistance, setEditDistance] = useState('');
  const [editInvoice, setEditInvoice] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchOrders = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20', ...(search && { search }), ...(filterStatus && { status: filterStatus }), ...(filterPayment && { paymentStatus: filterPayment }) });
    fetch(`/api/orders?${params}`).then(r => r.json()).then(d => {
      setOrders(d.orders || []);
      setTotal(d.pagination?.total || 0);
      setLoading(false);
    });
  };

  useEffect(() => { fetchOrders(); }, [page, search, filterStatus, filterPayment]);

  const openOrder = (order: any) => {
    setSelectedOrder(order);
    setEditNote(order.adminNote || '');
    setEditStatus(order.orderStatus);
    setEditPayStatus(order.paymentStatus);
    setEditDistance(order.distanceCharge || '');
    setEditInvoice(order.invoiceEnabled || false);
  };

  const saveOrder = async () => {
    setSaving(true);
    const r = await fetch(`/api/orders/${selectedOrder._id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: editStatus, paymentStatus: editPayStatus, adminNote: editNote, invoiceEnabled: editInvoice, distanceCharge: editDistance ? parseFloat(editDistance) : 0 }),
    });
    if (r.ok) {
      toast.success('Order updated!');
      setSelectedOrder(null);
      fetchOrders();
    } else toast.error('Failed to update');
    setSaving(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Orders ({total})</h1>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <FiSearch size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search order ID, email, name..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <select className="input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Status</option>
          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <select className="input" value={filterPayment} onChange={e => setFilterPayment(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Payments</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Books</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <tr key={i}><td colSpan={10}><div style={{ height: 20, background: 'var(--bg-secondary)', borderRadius: 4 }} /></td></tr>)
              ) : orders.map((order, idx) => (
                <tr key={order._id}>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{(page-1)*20+idx+1}</td>
                  <td style={{ fontSize: 12, fontWeight: 500 }}>{order.orderId}</td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{order.userName}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{order.userEmail}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{order.billingAddress?.phone}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-secondary)', maxWidth: 150 }}>
                    {order.billingAddress?.addressLine1}, {order.billingAddress?.city}, {order.billingAddress?.state} - {order.billingAddress?.pincode}
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {order.items?.map((item: any) => (
                        <div key={item.bookId} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <img src={item.image} alt="" style={{ width: 24, height: 32, objectFit: 'cover', borderRadius: 3 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/24x32/f5efe6/b5451b?text=B'; }} />
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 500, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</div>
                            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontWeight: 700, fontSize: 14 }}>₹{order.totalAmount}</td>
                  <td><span className={`badge ${order.paymentStatus === 'paid' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: 11 }}>{order.paymentStatus}</span></td>
                  <td><span className={`badge ${STATUS_COLORS[order.orderStatus] || 'badge-gray'}`} style={{ fontSize: 11 }}>{order.orderStatus}</span></td>
                  <td>
                    <button onClick={() => openOrder(order)} style={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <FiEye size={13} /> View
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
              <button key={i} onClick={() => setPage(i+1)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid', borderColor: page===i+1 ? 'var(--accent)' : 'var(--border)', background: page===i+1 ? 'var(--accent)' : 'var(--surface)', color: page===i+1 ? '#fff' : 'var(--text-primary)', cursor: 'pointer', fontSize: 13 }}>{i+1}</button>
            ))}
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="overlay">
          <div style={{ background: 'var(--surface)', borderRadius: 16, width: '90vw', maxWidth: 620, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 700 }}>Order: {selectedOrder.orderId}</h2>
              <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><FiX size={20} /></button>
            </div>
            <div style={{ overflow: 'auto', padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Customer */}
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 10, padding: 14 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{selectedOrder.userName}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                  📧 {selectedOrder.userEmail}<br/>
                  📞 {selectedOrder.billingAddress?.phone}<br/>
                  📍 {selectedOrder.billingAddress?.addressLine1}, {selectedOrder.billingAddress?.city}, {selectedOrder.billingAddress?.state} - {selectedOrder.billingAddress?.pincode}
                </div>
              </div>

              {/* Books ordered */}
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Items Ordered</div>
                {selectedOrder.items?.map((item: any) => (
                  <div key={item.bookId} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <img src={item.image} alt="" style={{ width: 44, height: 58, objectFit: 'cover', borderRadius: 6 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/44x58/f5efe6/b5451b?text=B'; }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 13 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>by {item.author} · Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</div>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontWeight: 700 }}>
                  <span>Total</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
              </div>

              {/* Admin controls */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="label">Order Status</label>
                  <select className="input" value={editStatus} onChange={e => setEditStatus(e.target.value)}>
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Payment Status</label>
                  <select className="input" value={editPayStatus} onChange={e => setEditPayStatus(e.target.value)}>
                    {['pending','paid','failed','refunded'].map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Distance Charge (₹)</label>
                  <input className="input" type="number" value={editDistance} onChange={e => setEditDistance(e.target.value)} placeholder="0" />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                    <input type="checkbox" checked={editInvoice} onChange={e => setEditInvoice(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--accent)' }} />
                    Enable Invoice Download
                  </label>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label className="label">Admin Note / Status Message</label>
                  <textarea className="input" value={editNote} onChange={e => setEditNote(e.target.value)} rows={3} placeholder="Write a note for the customer..." style={{ resize: 'vertical' }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setSelectedOrder(null)} className="btn-secondary">Cancel</button>
              <button onClick={saveOrder} disabled={saving} className="btn-primary">
                <FiSave size={14} /> {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
