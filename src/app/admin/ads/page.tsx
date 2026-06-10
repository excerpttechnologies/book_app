'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi';

const POSITIONS = ['top','bottom','left','right','center_popup','sidebar'];
const emptyAd = { title:'', description:'', link:'', buttonText:'', position:'bottom', displayPages:['home'], status:'draft', isSkippable:true, skipAfterSeconds:5, priority:0, image:'' };

export default function AdminAdsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAd, setEditAd] = useState<any>(null);
  const [form, setForm] = useState<any>(emptyAd);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchAds = () => {
    setLoading(true);
    fetch('/api/ads?admin=true').then(r => r.json()).then(d => { setAds(d.ads || []); setLoading(false); });
  };

  useEffect(() => { fetchAds(); }, []);

  const openCreate = () => { setForm(emptyAd); setEditAd(null); setShowModal(true); };
  const openEdit = (ad: any) => { setEditAd(ad); setForm({ ...emptyAd, ...ad }); setShowModal(true); };

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('files', file);
    fd.append('folder', 'ads');
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await r.json();
    setForm((f: any) => ({ ...f, image: d.urls?.[0] || '' }));
    setUploading(false);
  };

  const save = async () => {
    if (!form.title || !form.position) { toast.error('Fill required fields'); return; }
    setSaving(true);
    const url = editAd ? `/api/ads/${editAd._id}` : '/api/ads';
    const method = editAd ? 'PUT' : 'POST';
    const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (r.ok) { toast.success('Ad saved!'); setShowModal(false); fetchAds(); }
    else toast.error('Failed');
    setSaving(false);
  };

  const deleteAd = async (id: string) => {
    if (!confirm('Delete this ad?')) return;
    await fetch(`/api/ads/${id}`, { method: 'DELETE' });
    toast.success('Deleted');
    fetchAds();
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Ads Manager</h1>
        <button onClick={openCreate} className="btn-primary"><FiPlus size={16} /> Add Ad</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {loading ? [...Array(3)].map((_, i) => <div key={i} className="card" style={{ height: 180 }} />) :
          ads.map(ad => (
            <div key={ad._id} className="card" style={{ overflow: 'hidden' }}>
              {ad.image && <img src={ad.image} alt={ad.title} style={{ width: '100%', height: 120, objectFit: 'cover' }} />}
              <div style={{ padding: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 600, fontFamily: 'var(--font-body)', lineHeight: 1.3 }}>{ad.title}</h3>
                  <span className={`badge ${ad.status === 'active' ? 'badge-green' : 'badge-gray'}`} style={{ fontSize: 11, flexShrink: 0, marginLeft: 8 }}>{ad.status}</span>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span className="badge badge-gold" style={{ fontSize: 11 }}>📍 {ad.position}</span>
                  {ad.isSkippable && <span className="badge badge-gray" style={{ fontSize: 11 }}>Skip: {ad.skipAfterSeconds}s</span>}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openEdit(ad)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center', padding: '7px', fontSize: 13 }}>
                    <FiEdit2 size={13} /> Edit
                  </button>
                  <button onClick={() => deleteAd(ad._id)} style={{ padding: '7px 10px', background: 'var(--accent-light)', border: 'none', borderRadius: 8, cursor: 'pointer', color: '#1F3A52' }}>
                    <FiTrash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {showModal && (
        <div className="overlay">
          <div style={{ background: 'var(--surface)', borderRadius: 16, width: '90vw', maxWidth: 560, maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 700 }}>{editAd ? 'Edit Ad' : 'Create Ad'}</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><FiX size={20} /></button>
            </div>
            <div style={{ overflow: 'auto', padding: 24, flex: 1 }}>
              {/* Image upload */}
              <div style={{ marginBottom: 16 }}>
                <label className="label">Ad Image</label>
                {form.image
                  ? <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={form.image} alt="" style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 8 }} />
                      <button onClick={() => setForm((f: any) => ({ ...f, image: '' }))} style={{ position: 'absolute', top: -8, right: -8, background: '#1F3A52', border: 'none', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiX size={12} /></button>
                    </div>
                  : <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', border: '2px dashed var(--border)', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-muted)', width: 'fit-content' }}>
                      {uploading ? <div className="spinner" style={{ width: 16, height: 16 }} /> : <FiUpload size={16} />} Upload Image
                      <input type="file" accept="image/*" onChange={uploadImage} style={{ display: 'none' }} />
                    </label>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Title *', key: 'title' },
                  { label: 'Description', key: 'description' },
                  { label: 'Link URL', key: 'link' },
                  { label: 'Button Text', key: 'buttonText' },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="label">{label}</label>
                    <input className="input" value={form[key] || ''} onChange={e => setForm((f: any) => ({ ...f, [key]: e.target.value }))} />
                  </div>
                ))}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label className="label">Position *</label>
                    <select className="input" value={form.position} onChange={e => setForm((f: any) => ({ ...f, position: e.target.value }))}>
                      {POSITIONS.map(p => <option key={p} value={p}>{p.replace('_', ' ').toUpperCase()}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Status</label>
                    <select className="input" value={form.status} onChange={e => setForm((f: any) => ({ ...f, status: e.target.value }))}>
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                  <div>
                    <label className="label">Priority (higher = first)</label>
                    <input className="input" type="number" value={form.priority} onChange={e => setForm((f: any) => ({ ...f, priority: parseInt(e.target.value) || 0 }))} />
                  </div>
                  <div>
                    <label className="label">Skip After (seconds)</label>
                    <input className="input" type="number" value={form.skipAfterSeconds || ''} onChange={e => setForm((f: any) => ({ ...f, skipAfterSeconds: parseInt(e.target.value) || 5 }))} />
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14 }}>
                  <input type="checkbox" checked={form.isSkippable} onChange={e => setForm((f: any) => ({ ...f, isSkippable: e.target.checked }))} style={{ width: 16, height: 16, accentColor: '#1F3A52' }} />
                  Skippable by user
                </label>
              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
              <button onClick={save} disabled={saving} className="btn-primary">{saving ? 'Saving...' : editAd ? 'Update' : 'Create Ad'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
