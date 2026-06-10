'use client';
import { useEffect, useState } from 'react';
import { FiStar } from 'react-icons/fi';

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/testimonials').then(r => r.json()).then(d => setTestimonials(d.testimonials || [])).catch(() => {});
  }, []);

  if (!testimonials.length) return null;

  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 8 }}>What Our Customers Say</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Trusted by thousands of book lovers</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {testimonials.slice(0, 6).map((t: any) => (
          <div key={t._id} className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 14 }}>
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={14} fill={i < t.rating ? 'var(--gold)' : 'none'} color={i < t.rating ? 'var(--gold)' : 'var(--border)'} />
              ))}
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, marginBottom: 16, fontStyle: 'italic' }}>"{t.review}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {t.image
                ? <img src={t.image} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                : <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F3A52', fontWeight: 600 }}>{t.name[0]}</div>}
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                {t.designation && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{t.designation}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
