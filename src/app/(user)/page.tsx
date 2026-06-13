'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import BookCard from '@/components/user/BookCard';
import TestimonialsSection from '@/components/user/TestimonialsSection';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CATEGORIES = [
  { name: 'Books', icon: '📚', slug: 'books' },
  { name: 'God Photos', icon: '🕉️', slug: 'god-photos' },
  { name: 'Framed Calendar', icon: '📅', slug: 'framed-calendar' },
  { name: 'Wall Hanging', icon: '🖼️', slug: 'wall-hanging' },
  { name: 'Musical Box', icon: '🎵', slug: 'musical-box' },
  { name: 'Other Items', icon: '✨', slug: 'other-items' },
];

const LANGUAGES = [
  { name: 'Tamil', desc: 'தமிழ் புத்தகங்கள்' },
  { name: 'Telugu', desc: 'తెలుగు పుస్తకాలు' },
  { name: 'English', desc: 'English Books' },
];

export default function HomePage() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [featured, setFeatured] = useState<any[]>([]);
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/books?featured=true&limit=8').then(r => r.json()),
      fetch('/api/books?bestSeller=true&limit=8').then(r => r.json()),
      fetch('/api/books?limit=8&sort=createdAt&order=desc').then(r => r.json()),
      fetch('/api/settings').then(r => r.json()),
    ]).then(([f, b, n, s]) => {
      setFeatured(f.books || []);
      setBestSellers(b.books || []);
      setNewArrivals(n.books || []);
      setSliders(s.settings?.sliders?.length ? s.settings.sliders : [
        { title: 'Discover Divine Books', subtitle: 'Explore our collection of sacred texts in Tamil, Telugu & English', image: '' },
        { title: 'Shop by Language', subtitle: 'Find books in your preferred language', image: '' },
      ]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSliderIndex(i => (i + 1) % Math.max(sliders.length, 1)), 5000);
    return () => clearInterval(t);
  }, [sliders.length]);

  const currentSlide = sliders[sliderIndex] || sliders[0];

  return (
    <div>
      {/* Hero Slider */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden', background: 'linear-gradient(135deg, var(--accent-dark) 0%, var(--accent) 50%, var(--gold) 100%)' }}>
        {currentSlide?.image
          ? <img src={currentSlide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
          : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #8B3214 0%, #B5451B 50%, #C9943A 100%)' }} />
        }
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#fff', padding: '0 20px', maxWidth: 700 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,3.2rem)', color: '#fff', marginBottom: 16, textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
              {currentSlide?.title || 'Discover Divine Books'}
            </h1>
            <p style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)', color: 'rgba(255,255,255,0.9)', marginBottom: 28 }}>
              {currentSlide?.subtitle || 'Explore our vast collection of spiritual and devotional books'}
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/shop" className="btn-primary" style={{ background: '#fff', color: 'var(--accent)', padding: '12px 28px', fontSize: '1rem' }}>
                Shop Now
              </Link>
              <Link href="/category/books" className="btn-secondary" style={{ border: '2px solid rgba(255,255,255,0.7)', color: '#fff', padding: '12px 28px', fontSize: '1rem' }}>
                Browse Books
              </Link>
            </div>
          </div>
        </div>
        {/* Slider controls */}
        {sliders.length > 1 && (
          <>
            <button onClick={() => setSliderIndex(i => (i - 1 + sliders.length) % sliders.length)}
              style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <FiChevronLeft size={22} />
            </button>
            <button onClick={() => setSliderIndex(i => (i + 1) % sliders.length)}
              style={{ position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
              <FiChevronRight size={22} />
            </button>
            <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 }}>
              {sliders.map((_, i) => (
                <button key={i} onClick={() => setSliderIndex(i)} style={{ width: i === sliderIndex ? 24 : 8, height: 8, borderRadius: 4, background: i === sliderIndex ? '#fff' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'width 0.3s' }} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Categories */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 20px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 8 }}>Explore Our Categories</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Find exactly what you're looking for</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
          {CATEGORIES.map(cat => (
            <Link key={cat.name} href={`/category/${cat.slug}`}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '24px 16px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', transition: 'all 0.2s', textAlign: 'center' }}
              onMouseEnter={e => { (e.currentTarget.style.borderColor = 'var(--accent)'); (e.currentTarget.style.transform = 'translateY(-3px)'); (e.currentTarget.style.boxShadow = 'var(--shadow-md)'); }}
              onMouseLeave={e => { (e.currentTarget.style.borderColor = 'var(--border)'); (e.currentTarget.style.transform = ''); (e.currentTarget.style.boxShadow = ''); }}>
              <span style={{ fontSize: '2rem' }}>{cat.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Shop by Language */}
      <section style={{ background: 'var(--bg-secondary)', padding: '48px 20px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', marginBottom: 8 }}>Shop by Language</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Browse books in your preferred language</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
            {LANGUAGES.map((lang, i) => (
              <Link key={lang.name} href={`/shop?language=${lang.name}`}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', borderRadius: 'var(--radius)', background: ['var(--accent)', 'var(--gold)', 'var(--green)'][i], color: '#fff', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { (e.currentTarget.style.transform = 'translateY(-3px)'); (e.currentTarget.style.boxShadow = 'var(--shadow-lg)'); }}
                onMouseLeave={e => { (e.currentTarget.style.transform = ''); (e.currentTarget.style.boxShadow = ''); }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#fff', marginBottom: 6 }}>{lang.name}</h3>
                <p style={{ fontSize: 14, opacity: 0.85 }}>{lang.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 20px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)' }}>🏆 Best Sellers</h2>
            <Link href="/shop?bestSeller=true" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>
              View All <FiArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {bestSellers.map(book => <BookCard key={book._id} book={book} />)}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section style={{ background: 'var(--bg-secondary)', padding: '60px 20px' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ fontSize: 'clamp(1.3rem,3vw,1.8rem)' }}>✨ New Arrivals</h2>
              <Link href="/shop?sort=createdAt&order=desc" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: 'var(--accent)', fontWeight: 500 }}>
                View All <FiArrowRight size={16} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
              {newArrivals.map(book => <BookCard key={book._id} book={book} />)}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Delivery notice */}
      <section style={{ background: 'var(--gold-light)', padding: '32px 20px', borderTop: '1px solid var(--gold)', borderBottom: '1px solid var(--gold)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>
            🚚 <strong>Delivery Note:</strong> Please be informed that delivery charges are applicable and will be added separately at the time of dispatch. Our team will contact you to inform you about the delivery charges before shipping. | 
            தயவுசெய்து கவனிக்கவும்: டெலிவரி கட்டணங்கள் பொருந்தும். | 
            దయచేసి గమనించండి: డెలివరీ చార్జీలు వర్తిస్తాయి.
          </p>
        </div>
      </section>
    </div>
  );
}
