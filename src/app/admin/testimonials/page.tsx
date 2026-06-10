'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiStar, FiUpload } from 'react-icons/fi';

const empty = { name:'', designation:'', review:'', rating:5, status:'draft', featured:false, image:'' };

export default function AdminTestimonialsPage() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchList = () => {
    setLoading(true);
    fetch('/api/testimonials?admin=true').then(r => r.json()).then(d => { setList(d.testimonials || []); setLoading(false); });
  };

  useEffect(() => { fetchList(); }, []);

  const openCreate = () => { setForm(empty); setEditItem(null); setShowModal(true); };
  const openEdit = (item: any) => { setEditItem(item); setForm({ ...empty, ...item }); setShowModal(true); };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('files', file);
    fd.append('folder', 'testimonials');
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await r.json();
    setForm((f: any) => ({ ...f, image: d.urls?.[0] || '' }));
    setUploading(false);
  };

  const save = async () => {
    if (!form.name || !form.review) { toast.error('Fill required fields'); return; }
    setSaving(true);
    const url = editItem ? `/api/testimonials/${editItem._id}` : '/api/testimonials';
    const method = editItem ? 'PUT' : 'POST';
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (r.ok) { toast.success('Saved!'); setShowModal(false); fetchList(); }
    else toast.error('Failed');
    setSaving(false);
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    fetchList();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Testimonials</h1>
        <button onClick={openCreate} className="btn-primary"><FiPlus size={16} /> Add Testimonial</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="card" style={{ height: 180 }} />) :
          list.map(t => (
            <div key={t._id} className="card" style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 4, marginBottom: 10 }}>
                {[...Array(5)].map((_, i) => <FiStar key={i} size={13} fill={i < t.rating ? 'var(--gold)' : 'none'} color={i < t.rating ? 'var(--gold)' : 'var(--border)'} />)}
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>"{t.review}"</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                {t.image ? <img src={t.image} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} /> : <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F3A52', fontWeight: 600 }}>{t.name[0]}</div>}
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                  {t.designation && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.designation}</div>}
                </div>
                <span className={`badge ${t.status === 'active' ? 'badge-green' : 'badge-gray'}`} style={{ fontSize: 11, marginLeft: 'auto' }}>{t.status}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => openEdit(t)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '7px', fontSize: 13 }}><FiEdit2 size={13} /> Edit</button>
                <button onClick={() => deleteItem(t._id)} style={{ padding: '7px 10px', background: 'var(--accent-light)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#1F3A52' }}><FiTrash2 size={13} /></button>
              </div>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="overlay">
          <div style={{ background: 'var(--surface)', borderRadius: 16, width: '90vw', maxWidth: 500, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{editItem ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><FiX size={20} /></button>
            </div>
            <div style={{ overflow: 'auto', padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="label">Photo</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {form.image ? <img src={form.image} alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} /> : <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>👤</div>}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
                    {uploading ? <div className="spinner" style={{ width: 14, height: 14 }} /> : <FiUpload size={14} />} Upload
                    <input type="file" accept="image/*" onChange={uploadImage} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
              {[{ label: 'Name *', key: 'name' }, { label: 'Designation', key: 'designation' }].map(({ label, key }) => (
                <div key={key}>
                  <label className="label">{label}</label>
                  <input className="input" value={form[key] || ''} onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <div>
                <label className="label">Review *</label>
                <textarea className="input" value={form.review || ''} onChange={e => setForm((f: any) => ({ ...f, review: e.target.value }))} rows={3} style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="label">Rating</label>
                  <select className="input" value={form.rating} onChange={e => setForm((f: any) => ({ ...f, rating: parseInt(e.target.value) }))}>
                    {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Status</label>
                  <select className="input" value={form.status} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}>
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                <input type="checkbox" checked={form.featured} onChange={e => setForm((f: any) => ({ ...f, featured: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#1F3A52' }} />
                Featured testimonial
              </label>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary">{saving ? 'Saving...' : editItem ? 'Update' : 'Add'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
