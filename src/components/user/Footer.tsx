'use client';
import Link from 'next/link';
import { FiPhone, FiMail, FiMapPin, FiFacebook, FiInstagram, FiYoutube } from 'react-icons/fi';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [settings, setSettings] = useState<any>(null);
  useEffect(() => {
    fetch('/api/settings').then(r => r.json()).then(d => setSettings(d.settings)).catch(() => {});
  }, []);

  return (
    <footer style={{ background: 'var(--text-primary)', color: '#fff', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 20px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: '#fff', marginBottom: 12 }}>
              📖 {settings?.siteName || 'OM Spiritual'}
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 16 }}>
              {settings?.tagline || 'Your trusted source for divine and spiritual books in Tamil, Telugu, and English.'}
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[FiFacebook, FiInstagram, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1F3A52') }
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}>
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Books', 'God Photos', 'Framed Calendar', 'Wall Hanging', 'Musical Box'].map(cat => (
                <li key={cat}>
                  <Link href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Shop by Language</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Tamil', 'Telugu', 'English', 'Hindi', 'Sanskrit'].map(lang => (
                <li key={lang}>
                  <Link href={`/shop?language=${lang}`} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                    {lang}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {settings?.supportPhone && (
                <a href={`tel:${settings.supportPhone}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  <FiPhone size={14} /> {settings.supportPhone}
                </a>
              )}
              {settings?.adminEmail && (
                <a href={`mailto:${settings.adminEmail}`} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  <FiMail size={14} /> {settings.adminEmail}
                </a>
              )}
              {settings?.address && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>
                  <FiMapPin size={14} style={{ marginTop: 2, flexShrink: 0 }} /> {settings.address}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
            © {new Date().getFullYear()} {settings?.siteName || 'OM Spiritual'}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {['Privacy Policy', 'Shipping Policy', 'Return Policy', 'Contact'].map(link => (
              <Link key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
