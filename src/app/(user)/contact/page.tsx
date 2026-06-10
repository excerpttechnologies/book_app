'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FiSend, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState({ userName: session?.user?.name || '', userEmail: session?.user?.email || '', phone: '', type: 'query', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!form.userName || !form.userEmail || !form.subject || !form.message) { toast.error('Fill all required fields'); return; }
    setSending(true);
    const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    if (r.ok) { setSent(true); toast.success('Message sent!'); }
    else toast.error('Failed to send');
    setSending(false);
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 8 }}>Contact Us</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>We're here to help. Reach out anytime!</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40 }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 20 }}>Get in Touch</h2>
          {[
            { icon: FiPhone, label: 'Phone', value: '+91 7871721995', href: 'tel:+91 7871721995' },
            { icon: FiMail, label: 'Email', value: 'support@OMSpiritual.com', href: 'mailto:support@OMSpiritual.com' },
            { icon: FiMapPin, label: 'Address', value: 'Chennai, Tamil Nadu, India', href: '#' },
          ].map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20, padding: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text-primary)' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} color="#1F3A52" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>{value}</div>
              </div>
            </a>
          ))}

          <div style={{ padding: 20, background: 'var(--gold-light)', borderRadius: 10, border: '1px solid var(--gold)' }}>
            <h3 style={{ fontSize: '0.95rem', marginBottom: 10, fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-secondary)' }}>Working Hours</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>Monday – Saturday: 9AM – 6PM<br />Sunday: 10AM – 4PM</p>
          </div>
        </div>

        <div className="card" style={{ padding: 28 }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
              <h3 style={{ marginBottom: 8 }}>Message Sent!</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>We'll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="btn-secondary" style={{ marginTop: 20 }}>Send Another</button>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '1.1rem', marginBottom: 20, fontFamily: 'var(--font-body)', fontWeight: 600 }}>Send a Message</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="label">Your Name *</label>
                    <input className="input" value={form.userName} onChange={e => setForm(f => ({ ...f, userName: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input className="input" type="email" value={form.userEmail} onChange={e => setForm(f => ({ ...f, userEmail: e.target.value }))} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label className="label">Phone</label>
                    <input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="label">Type</label>
                    <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      {['query','complaint','feedback','report','other'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Subject *</label>
                  <input className="input" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </div>
                <div>
                  <label className="label">Message *</label>
                  <textarea className="input" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} style={{ resize: 'vertical' }} />
                </div>
                <button onClick={submit} disabled={sending} className="btn-primary" style={{ alignSelf: 'flex-start', padding: '11px 24px' }}>
                  <FiSend size={15} /> {sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
