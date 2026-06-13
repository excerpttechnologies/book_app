'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiDownload, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('orders');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dashData, setDashData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/admin/dashboard?filter=yearly').then(r => r.json()).then(d => setDashData(d));
  }, []);

  const fetchReport = async () => {
    setLoading(true);
    const params = new URLSearchParams({ type: reportType, ...(dateFrom && { from: dateFrom }), ...(dateTo && { to: dateTo }) });
    const r = await fetch(`/api/admin/reports?${params}`);
    const d = await r.json();
    setData(d.data || []);
    setLoading(false);
  };

  const exportExcel = async () => {
    try {
      const XLSX = await import('xlsx');
      let rows: any[] = [];
      if (reportType === 'orders') {
        rows = data.map((o: any) => ({ 'Order ID': o.orderId, 'Customer': o.userName, 'Email': o.userEmail, 'Amount': o.totalAmount, 'Payment': o.paymentStatus, 'Status': o.orderStatus, 'Date': new Date(o.createdAt).toLocaleDateString() }));
      } else if (reportType === 'books') {
        rows = data.map((b: any) => ({ 'Title': b.title, 'Author': b.author, 'Category': b.category, 'Language': b.language, 'Price': b.price, 'Stock': b.stock, 'Sold': b.soldCount, 'Status': b.status }));
      } else if (reportType === 'users') {
        rows = data.map((u: any) => ({ 'Name': u.name, 'Email': u.email, 'Phone': u.phone, 'Status': u.status, 'Joined': new Date(u.createdAt).toLocaleDateString() }));
      }
      const ws = XLSX.utils.json_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, reportType);
      XLSX.writeFile(wb, `${reportType}_report_${Date.now()}.xlsx`);
      toast.success('Excel downloaded!');
    } catch (err) {
      toast.error('Export failed');
    }
  };

  const exportPDF = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`, 14, 20);
      doc.setFontSize(10);
      doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28);

      let y = 40;
      if (reportType === 'orders') {
        data.slice(0, 30).forEach((o: any, i: number) => {
          if (y > 270) { doc.addPage(); y = 20; }
          doc.text(`${i+1}. ${o.orderId} | ${o.userName} | ₹${o.totalAmount} | ${o.orderStatus}`, 14, y);
          y += 7;
        });
      }
      doc.save(`${reportType}_report.pdf`);
      toast.success('PDF downloaded!');
    } catch (err) {
      toast.error('PDF export failed');
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.6rem', marginBottom: 24 }}>Reports & Analytics</h1>

      {/* Charts */}
      {dashData && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, fontFamily: 'var(--font-body)' }}>Annual Revenue</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dashData.monthlySales} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="revenue" fill="var(--accent)" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, fontFamily: 'var(--font-body)' }}>Monthly Orders</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dashData.monthlySales} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="orders" stroke="var(--gold)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Report Generator */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 18 }}>Generate Report</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label className="label">Report Type</label>
            <select className="input" value={reportType} onChange={e => setReportType(e.target.value)} style={{ width: 160 }}>
              <option value="orders">Orders</option>
              <option value="revenue">Revenue</option>
              <option value="users">Users</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div>
            <label className="label">From Date</label>
            <input className="input" type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} style={{ width: 160 }} />
          </div>
          <div>
            <label className="label">To Date</label>
            <input className="input" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} style={{ width: 160 }} />
          </div>
          <button onClick={fetchReport} disabled={loading} className="btn-primary">
            {loading ? 'Loading...' : 'Generate'}
          </button>
          {data.length > 0 && (
            <>
              <button onClick={exportExcel} className="btn-secondary">
                <FiDownload size={14} /> Export Excel
              </button>
              <button onClick={exportPDF} className="btn-secondary">
                <FiFileText size={14} /> Export PDF
              </button>
            </>
          )}
        </div>
      </div>

      {/* Data table */}
      {data.length > 0 && (
        <div className="card">
          <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>{data.length} records found</span>
          </div>
          <div className="table-wrapper">
            {reportType === 'orders' && (
              <table>
                <thead><tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Payment</th><th>Status</th><th>Date</th></tr></thead>
                <tbody>
                  {data.map((o: any) => (
                    <tr key={o._id}>
                      <td style={{ fontSize: 12 }}>{o.orderId}</td>
                      <td><div style={{ fontSize: 13 }}>{o.userName}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{o.userEmail}</div></td>
                      <td style={{ fontWeight: 600 }}>₹{o.totalAmount}</td>
                      <td><span className={`badge ${o.paymentStatus==='paid'?'badge-green':'badge-gold'}`} style={{ fontSize: 11 }}>{o.paymentStatus}</span></td>
                      <td><span className="badge badge-gray" style={{ fontSize: 11 }}>{o.orderStatus}</span></td>
                      <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {reportType === 'books' && (
              <table>
                <thead><tr><th>Title</th><th>Category</th><th>Language</th><th>Price</th><th>Stock</th><th>Sold</th><th>Status</th></tr></thead>
                <tbody>
                  {data.map((b: any) => (
                    <tr key={b._id}>
                      <td><div style={{ fontWeight: 500, fontSize: 13 }}>{b.title}</div><div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{b.author}</div></td>
                      <td style={{ fontSize: 13 }}>{b.category}</td>
                      <td style={{ fontSize: 13 }}>{b.language}</td>
                      <td style={{ fontWeight: 600 }}>₹{b.price}</td>
                      <td>{b.stock}</td>
                      <td><span className="badge badge-gold" style={{ fontSize: 11 }}>{b.soldCount}</span></td>
                      <td><span className={`badge ${b.status==='published'?'badge-green':'badge-gray'}`} style={{ fontSize: 11 }}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {reportType === 'users' && (
              <table>
                <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Joined</th></tr></thead>
                <tbody>
                  {data.map((u: any) => (
                    <tr key={u._id}>
                      <td style={{ fontWeight: 500, fontSize: 13 }}>{u.name}</td>
                      <td style={{ fontSize: 13 }}>{u.email}</td>
                      <td style={{ fontSize: 13 }}>{u.phone || '—'}</td>
                      <td><span className={`badge ${u.status==='active'?'badge-green':'badge-red'}`} style={{ fontSize: 11 }}>{u.status}</span></td>
                      <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
