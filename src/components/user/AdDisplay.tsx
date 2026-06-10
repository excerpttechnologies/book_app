'use client';
import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

interface Ad { _id: string; title: string; description?: string; image?: string; link?: string; buttonText?: string; position: string; isSkippable: boolean; skipAfterSeconds?: number; }

export default function AdDisplay() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [skipCountdown, setSkipCountdown] = useState<Record<string, number>>({});

  useEffect(() => {
    fetch('/api/ads').then(r => r.json()).then(d => {
      setAds(d.ads || []);
      const countdowns: Record<string, number> = {};
      (d.ads || []).forEach((ad: Ad) => {
        if (ad.position === 'center_popup' && !ad.isSkippable && ad.skipAfterSeconds) {
          countdowns[ad._id] = ad.skipAfterSeconds;
        }
      });
      setSkipCountdown(countdowns);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkipCountdown(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(id => { if (next[id] > 0) next[id]--; });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const dismiss = (id: string) => setDismissed(prev => new Set([...prev, id]));

  const popupAd = ads.find(a => a.position === 'center_popup' && !dismissed.has(a._id));
  const bottomAd = ads.find(a => a.position === 'bottom' && !dismissed.has(a._id));

  return (
    <>
      {/* Center Popup */}
      {popupAd && (
        <div className="overlay" onClick={() => popupAd.isSkippable && dismiss(popupAd._id)}>
          <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', maxWidth: 480, width: '90vw', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative', animation: 'fadeIn 0.3s ease' }}>
            {popupAd.image && <img src={popupAd.image} alt={popupAd.title} style={{ width: '100%', maxHeight: 240, objectFit: 'cover' }} />}
            <div style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 8 }}>{popupAd.title}</h3>
              {popupAd.description && <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 16 }}>{popupAd.description}</p>}
              {popupAd.link && (
                <a href={popupAd.link} className="btn-primary" style={{ display: 'inline-block' }}>
                  {popupAd.buttonText || 'Learn More'}
                </a>
              )}
            </div>
            {(popupAd.isSkippable || (skipCountdown[popupAd._id] ?? 1) === 0) && (
              <button onClick={() => dismiss(popupAd._id)} style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                {skipCountdown[popupAd._id] > 0 ? <span style={{ fontSize: 11 }}>{skipCountdown[popupAd._id]}s</span> : <FiX size={16} />}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Banner */}
      {bottomAd && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 20, background: '#1F3A52', color: '#fff', padding: '12px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {bottomAd.image && <img src={bottomAd.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />}
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{bottomAd.title}</div>
              {bottomAd.description && <div style={{ fontSize: 12, opacity: 0.85 }}>{bottomAd.description}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {bottomAd.link && (
              <a href={bottomAd.link} style={{ background: '#fff', color: '#1F3A52', padding: '6px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                {bottomAd.buttonText || 'View'}
              </a>
            )}
            <button onClick={() => dismiss(bottomAd._id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', opacity: 0.8 }}>
              <FiX size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
