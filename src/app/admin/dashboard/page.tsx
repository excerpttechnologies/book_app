'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiShoppingBag, FiDollarSign, FiUsers, FiBook, FiTrendingUp, FiPackage } from 'react-icons/fi';
import Link from 'next/link';

const FILTERS = ['daily', 'monthly', 'yearly'];
const COLORS = ['#B5451B', '#C9943A', '#2D6A4F', '#6B5CE7'];

function StatCard({ icon: Icon, label, value, sub, color = 'var(--accent)' }: any) {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 700, fontFamily: 'var(--font-display)', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{label}</div>
      {sub && <div style={{ fontSize: 12, color: 'var(--green)', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [filter, setFilter] = useState('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/dashboard?filter=${filter}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); });
  }, [filter]);

  if (loading || !data) {
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
          {[...Array(4)].map((_, i) => <div key={i} className="card" style={{ padding: 20, height: 110 }} />)}
        </div>
      </div>
    );
  }

  const { stats, recentOrders, topBooks, monthlySales, profitLoss } = data;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Dashboard</h1>
        <div style={{ display: 'flex', gap: 4, background: 'var(--bg-secondary)', borderRadius: 10, padding: 4 }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500, background: filter === f ? 'var(--surface)' : 'transparent', color: filter === f ? 'var(--accent)' : 'var(--text-muted)', boxShadow: filter === f ? 'var(--shadow-sm)' : 'none', textTransform: 'capitalize' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard icon={FiShoppingBag} label="Total Orders" value={stats.totalOrders} sub={`+${stats.periodOrders} this period`} color="var(--accent)" />
        <StatCard icon={FiDollarSign} label="Total Revenue" value={`₹${(stats.totalRevenue || 0).toLocaleString()}`} sub={`₹${(stats.periodRevenue || 0).toLocaleString()} this period`} color="var(--green)" />
        <StatCard icon={FiUsers} label="Total Users" value={stats.totalUsers} color="#6B5CE7" />
        <StatCard icon={FiBook} label="Published Books" value={stats.totalBooks} color="var(--gold)" />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Monthly Sales Bar Chart */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, fontFamily: 'var(--font-body)' }}>Monthly Sales</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlySales} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Bar dataKey="revenue" fill="var(--accent)" radius={[4, 4, 0, 0]} name="Revenue (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Profit/Loss Line Chart */}
        <div className="card" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 16, fontFamily: 'var(--font-body)' }}>Profit / Loss Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={profitLoss} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
              <Tooltip contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13 }} />
              <Line type="monotone" dataKey="profit" stroke="var(--green)" strokeWidth={2} dot={false} name="Profit (₹)" />
              <Line type="monotone" dataKey="revenue" stroke="var(--accent)" strokeWidth={2} dot={false} name="Revenue (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
        {/* Recent Orders */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Recent Orders</h3>
            <Link href="/admin/orders" style={{ fontSize: 13, color: 'var(--accent)' }}>View All</Link>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.slice(0, 6).map((order: any) => (
                  <tr key={order._id}>
                    <td style={{ fontSize: 12 }}>{order.orderId}</td>
                    <td style={{ fontSize: 13 }}>{order.userName}</td>
                    <td style={{ fontWeight: 600 }}>₹{order.totalAmount}</td>
                    <td>
                      <span className={`badge ${order.paymentStatus === 'paid' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: 11 }}>
                        {order.orderStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Books */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>Top Selling Books</h3>
            <Link href="/admin/books" style={{ fontSize: 13, color: 'var(--accent)' }}>View All</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topBooks.map((book: any, i: number) => (
              <div key={book._id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: ['var(--accent-light)', 'var(--gold-light)', 'var(--green-light)'][i] || 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: ['var(--accent)', 'var(--gold)', 'var(--green)'][i] || 'var(--text-muted)', flexShrink: 0 }}>
                  {i + 1}
                </div>
                <img src={book.images?.[0]} alt="" style={{ width: 32, height: 42, objectFit: 'cover', borderRadius: 4 }} onError={e => { (e.target as HTMLImageElement).src = 'https://placehold.co/32x42/f5efe6/b5451b?text=B'; }} />
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{book.soldCount} sold</div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>₹{book.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
