'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';

const TYPE_COLORS: Record<string, string> = { query: 'badge-gold', complaint: 'badge-red', spam: 'badge-red', report: 'badge-red', feedback: 'badge-green', other: 'badge-gray' };

export default function AdminQueriesPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterType, setFilterType] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<any>(null);
  const [reply, setReply] = useState('');
  const [replyStatus, setReplyStatus] = useState('resolved');
  const [saving, setSaving] = useState(false);

  const fetchContacts = () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: '20', ...(filterStatus && { status: filterStatus }), ...(filterType && { type: filterType }) });
    fetch(`/api/contact?${params}`).then(r => r.json()).then(d => { setContacts(d.contacts || []); setTotal(d.pagination?.total || 0); setLoading(false); });
  };

  useEffect(() => { fetchContacts(); }, [page, filterStatus, filterType]);

  const sendReply = async () => {
    if (!reply.trim()) { toast.error('Enter a reply'); return; }
    setSaving(true);
    const r = await fetch(`/api/contact/${selected._id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ adminReply: reply, status: replyStatus }) });
    if (r.ok) { toast.success('Reply sent!'); setSelected(null); setReply(''); fetchContacts(); }
    else toast.error('Failed');
    setSaving(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Queries & Support ({total})</h1>
      </div>

      <div className="card" style={{ padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 12 }}>
        <select className="input" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Status</option>
          {['open','in_progress','resolved','closed'].map(s => <option key={s} value={s}>{s.replace('_',' ').toUpperCase()}</option>)}
        </select>
        <select className="input" value={filterType} onChange={e => setFilterType(e.target.value)} style={{ width: 'auto' }}>
          <option value="">All Types</option>
          {['query','complaint','spam','report','feedback','other'].map(t => <option key={t} value={t}>{t.toUpperCase()}</option>)}
        </select>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr><th>Name</th><th>Email</th><th>Type</th><th>Subject</th><th>Status</th><th>Date</th><th>Action</th></tr>
            </thead>
            <tbody>
              {loading ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={7}><div style={{ height: 20, background: 'var(--bg-secondary)', borderRadius: 4 }} /></td></tr>) :
                contacts.map(c => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 500, fontSize: 13 }}>{c.userName}</td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.userEmail}</td>
                    <td><span className={`badge ${TYPE_COLORS[c.type] || 'badge-gray'}`} style={{ fontSize: 11 }}>{c.type}</span></td>
                    <td style={{ fontSize: 13, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.subject}</td>
                    <td><span className={`badge ${c.status === 'resolved' ? 'badge-green' : c.status === 'open' ? 'badge-red' : 'badge-gold'}`} style={{ fontSize: 11 }}>{c.status}</span></td>
                    <td style={{ fontSize: 12, color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => { setSelected(c); setReply(c.adminReply || ''); setReplyStatus(c.status === 'open' ? 'resolved' : c.status); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: 12, background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                        <FiMessageSquare size={12} /> Reply
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="overlay">
          <div style={{ background: 'var(--surface)', borderRadius: 16, width: '90vw', maxWidth: 560, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 700 }}>Query from {selected.userName}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><FiX size={20} /></button>
            </div>
            <div style={{ overflow: 'auto', padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ background: 'var(--bg-secondary)', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <span className={`badge ${TYPE_COLORS[selected.type]}`} style={{ fontSize: 11 }}>{selected.type}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{selected.subject}</span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{selected.message}</p>
                <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>
                  From: {selected.userName} ({selected.userEmail}) | {new Date(selected.createdAt).toLocaleString()}
                </div>
              </div>
              {selected.adminReply && (
                <div style={{ background: 'var(--accent-light)', borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, marginBottom: 6 }}>Previous Reply:</div>
                  <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{selected.adminReply}</p>
                </div>
              )}
              <div>
                <label className="label">Your Reply</label>
                <textarea className="input" value={reply} onChange={e => setReply(e.target.value)} rows={4} placeholder="Type your reply..." style={{ resize: 'vertical' }} />
              </div>
              <div>
                <label className="label">Update Status</label>
                <select className="input" value={replyStatus} onChange={e => setReplyStatus(e.target.value)}>
                  {['open','in_progress','resolved','closed'].map(s => <option key={s} value={s}>{s.replace('_',' ').toUpperCase()}</option>)}
                </select>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setSelected(null)} className="btn-secondary">Cancel</button>
              <button onClick={sendReply} disabled={saving} className="btn-primary">
                <FiSend size={14} /> {saving ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
