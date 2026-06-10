'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSearch, FiSlash, FiCheckCircle, FiMail } from 'react-icons/fi';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [page, setPage] = useState(1);

  const fetchUsers = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20', ...(search && { search }), ...(filterStatus && { status: filterStatus }) });
    fetch(`/api/users?${params}`).then(r => r.json()).then(d => {
      setUsers(d.users || []);
      setTotal(d.pagination?.total || 0);
      setLoading(false);
    });
  };

  useEffect(() => { fetchUsers(); }, [page, search, filterStatus]);

  const toggleStatus = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    await fetch(`/api/users/${userId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus }) });
    toast.success(`User ${newStatus}`);
    fetchUsers();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Users ({total})</h1>
      </div>

      {/* Stats mini */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 20 }}>
        {[
          { label: 'Total Users', value: total, color: '#1F3A52' },
          { label: 'Active', value: users.filter(u => u.status === 'active').length, color: 'var(--green)' },
          { label: 'Blocked', value: users.filter(u => u.status === 'blocked').length, color: '#1F3A52' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '14px 16px' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <FiSearch size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
        <select className="input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>S.No</th>
                <th>User</th>
                <th>Phone</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Cart Items</th>
                <th>Wishlist</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => <tr key={i}><td colSpan={10}><div style={{ height: 20, background: 'var(--bg-secondary)', borderRadius: 4 }} /></td></tr>)
              ) : users.map((user, idx) => (
                <tr key={user._id}>
                  <td style={{ fontSize: 13, color: 'var(--text-muted)' }}>{(page-1)*20+idx+1}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      {user.image
                        ? <img src={user.image} alt="" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                        : <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F3A52', fontWeight: 600, fontSize: 13 }}>{user.name?.[0]}</div>}
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{user.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontSize: 13 }}>{user.phone || '—'}</td>
                  <td style={{ textAlign: 'center' }}><span className="badge badge-gold">{user.orderCount || 0}</span></td>
                  <td style={{ fontWeight: 600, fontSize: 13 }}>₹{(user.totalSpent || 0).toLocaleString()}</td>
                  <td style={{ textAlign: 'center', fontSize: 13 }}>{user.cart?.length || 0}</td>
                  <td style={{ textAlign: 'center', fontSize: 13 }}>{user.wishlist?.length || 0}</td>
                  <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td><span className={`badge ${user.status === 'active' ? 'badge-green' : 'badge-red'}`}>{user.status}</span></td>
                  <td>
                    <button onClick={() => toggleStatus(user._id, user.status)}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, background: user.status === 'blocked' ? 'var(--green-light)' : 'var(--accent-light)', color: user.status === 'blocked' ? 'var(--green)' : '#1F3A52' }}>
                      {user.status === 'blocked' ? <FiCheckCircle size={12} /> : <FiSlash size={12} />}
                      {user.status === 'blocked' ? 'Approve' : 'Block'}
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
              <button key={i} onClick={() => setPage(i+1)} style={{ width: 32, height: 32, borderRadius: 6, border: '1px solid', borderColor: page===i+1?'#1F3A52':'var(--border)', background: page===i+1?'#1F3A52':'var(--surface)', color: page===i+1?'#fff':'var(--text-primary)', cursor: 'pointer', fontSize: 13 }}>{i+1}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
