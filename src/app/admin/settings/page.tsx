'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiSave, FiUpload, FiX, FiPlus } from 'react-icons/fi';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings || {}));
  }, []);

  const handleUpload = async (field: string, file: File, folder: string) => {
    setUploading(u => ({ ...u, [field]: true }));
    const fd = new FormData();
    fd.append('files', file);
    fd.append('folder', folder);
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await r.json();
    setSettings((s: any) => ({ ...s, [field]: d.urls?.[0] }));
    setUploading(u => ({ ...u, [field]: false }));
  };

  const save = async () => {
    setSaving(true);
    const r = await fetch('/api/settings', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(settings) });
    if (r.ok) toast.success('Settings saved!');
    else toast.error('Failed to save');
    setSaving(false);
  };

  const addSlider = () => setSettings((s: any) => ({ ...s, sliders: [...(s.sliders || []), { image: '', title: '', subtitle: '', link: '', order: (s.sliders?.length || 0) }] }));
  const removeSlider = (idx: number) => setSettings((s: any) => ({ ...s, sliders: s.sliders.filter((_: any, i: number) => i !== idx) }));

  if (!settings) return <div style={{ padding: 40, textAlign: 'center' }}><div className="spinner" style={{ width: 32, height: 32, margin: '0 auto' }} /></div>;

  const UploadField = ({ label, field, folder, accept = 'image/*' }: { label: string; field: string; folder: string; accept?: string }) => (
    <div>
      <label className="label">{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {settings[field] && <img src={settings[field]} alt="" style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--border)' }} />}
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px solid var(--border)', borderRadius: 8, cursor: 'pointer', fontSize: 13, color: 'var(--text-secondary)' }}>
          {uploading[field] ? <div className="spinner" style={{ width: 14, height: 14 }} /> : <FiUpload size={14} />} {settings[field] ? 'Change' : 'Upload'}
          <input type="file" accept={accept} onChange={e => e.target.files?.[0] && handleUpload(field, e.target.files[0], folder)} style={{ display: 'none' }} />
        </label>
        {settings[field] && <button onClick={() => setSettings((s: any) => ({ ...s, [field]: '' }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}><FiX size={15} /></button>}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: '1.6rem' }}>Settings</h1>
        <button onClick={save} disabled={saving} className="btn-primary">
          <FiSave size={15} /> {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>

      {/* General */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 18 }}>🏠 General</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label className="label">Site Name</label>
            <input className="input" value={settings.siteName || ''} onChange={e => setSettings((s: any) => ({ ...s, siteName: e.target.value }))} />
          </div>
          <div>
            <label className="label">Tagline</label>
            <input className="input" value={settings.tagline || ''} onChange={e => setSettings((s: any) => ({ ...s, tagline: e.target.value }))} />
          </div>
          <UploadField label="Site Logo" field="logo" folder="settings" />
          <UploadField label="Favicon" field="favicon" folder="settings" />
          <div>
            <label className="label">Admin Email</label>
            <input className="input" value={settings.adminEmail || ''} onChange={e => setSettings((s: any) => ({ ...s, adminEmail: e.target.value }))} />
          </div>
          <div>
            <label className="label">Support Phone</label>
            <input className="input" value={settings.supportPhone || ''} onChange={e => setSettings((s: any) => ({ ...s, supportPhone: e.target.value }))} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label className="label">Address</label>
            <textarea className="input" value={settings.address || ''} onChange={e => setSettings((s: any) => ({ ...s, address: e.target.value }))} rows={2} style={{ resize: 'vertical' }} />
          </div>
        </div>
      </div>

      {/* Invoice */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 18 }}>🧾 Invoice Settings</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div>
            <label className="label">Invoice Name</label>
            <input className="input" value={settings.invoiceName || ''} onChange={e => setSettings((s: any) => ({ ...s, invoiceName: e.target.value }))} />
          </div>
          <UploadField label="Invoice Logo" field="invoiceLogo" folder="settings" />
          <div style={{ gridColumn: '1/-1' }}>
            <label className="label">Invoice Terms & Conditions</label>
            <textarea className="input" value={settings.invoiceTerms || ''} onChange={e => setSettings((s: any) => ({ ...s, invoiceTerms: e.target.value }))} rows={3} style={{ resize: 'vertical' }} />
          </div>
          <div style={{ gridColumn: '1/-1' }}>
            <label className="label">Invoice Note</label>
            <textarea className="input" value={settings.invoiceNote || ''} onChange={e => setSettings((s: any) => ({ ...s, invoiceNote: e.target.value }))} rows={2} style={{ resize: 'vertical' }} />
          </div>
        </div>
      </div>

      {/* Bank Details */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 18 }}>🏦 Bank Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            ['bankName', 'Bank Name'],
            ['bankAccountNumber', 'Account Number'],
            ['bankIFSC', 'IFSC Code'],
            ['bankBranch', 'Branch'],
            ['upiId', 'UPI ID'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input className="input" value={(settings as any)[key] || ''} onChange={e => setSettings((s: any) => ({ ...s, [key]: e.target.value }))} />
            </div>
          ))}
          <UploadField label="Payment QR Code" field="paymentQR" folder="settings" />
        </div>
      </div>

      {/* Social */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <h2 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 18 }}>🔗 Social Links</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {['facebook', 'instagram', 'twitter', 'youtube', 'whatsapp'].map(key => (
            <div key={key}>
              <label className="label" style={{ textTransform: 'capitalize' }}>{key}</label>
              <input className="input" value={settings.socialLinks?.[key] || ''} onChange={e => setSettings((s: any) => ({ ...s, socialLinks: { ...s.socialLinks, [key]: e.target.value } }))} placeholder={`https://...`} />
            </div>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>🖼️ Home Sliders</h2>
          <button onClick={addSlider} className="btn-secondary" style={{ padding: '7px 12px', fontSize: 13 }}>
            <FiPlus size={13} /> Add Slide
          </button>
        </div>
        {(settings.sliders || []).map((slide: any, idx: number) => (
          <div key={idx} style={{ background: 'var(--bg-secondary)', borderRadius: 10, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600 }}>Slide {idx + 1}</span>
              <button onClick={() => removeSlider(idx)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', padding: 4 }}><FiX size={15} /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div>
                <label className="label">Title</label>
                <input className="input" value={slide.title || ''} onChange={e => { const s = [...settings.sliders]; s[idx].title = e.target.value; setSettings((st: any) => ({ ...st, sliders: s })); }} />
              </div>
              <div>
                <label className="label">Subtitle</label>
                <input className="input" value={slide.subtitle || ''} onChange={e => { const s = [...settings.sliders]; s[idx].subtitle = e.target.value; setSettings((st: any) => ({ ...st, sliders: s })); }} />
              </div>
              <div>
                <label className="label">Link</label>
                <input className="input" value={slide.link || ''} onChange={e => { const s = [...settings.sliders]; s[idx].link = e.target.value; setSettings((st: any) => ({ ...st, sliders: s })); }} />
              </div>
              <div>
                <label className="label">Image</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {slide.image && <img src={slide.image} alt="" style={{ width: 48, height: 30, objectFit: 'cover', borderRadius: 4 }} />}
                  <label style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', border: '1px solid var(--border)', borderRadius: 7, cursor: 'pointer', fontSize: 12, background: 'var(--surface)' }}>
                    <FiUpload size={12} /> Upload
                    <input type="file" accept="image/*" onChange={async e => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const fd = new FormData();
                      fd.append('files', file);
                      fd.append('folder', 'sliders');
                      const r = await fetch('/api/upload', { method: 'POST', body: fd });
                      const d = await r.json();
                      const s = [...settings.sliders];
                      s[idx].image = d.urls?.[0] || '';
                      setSettings((st: any) => ({ ...st, sliders: s }));
                    }} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
