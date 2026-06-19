'use client';
import { signIn } from 'next-auth/react';
import { FiLogIn } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📖</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', marginBottom: 6 }}>OM Spiritual Books</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Sign in to continue shopping</p>
        </div>
        <div className="card" style={{ padding: 32 }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: 8, textAlign: 'center' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, textAlign: 'center', marginBottom: 28 }}>
            Sign in with your Google account to access your cart, orders, and wishlist.
          </p>
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '13px 20px', background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', fontSize: 15, fontWeight: 600, cursor: 'pointer', color: '#3c4043', transition: 'box-shadow 0.2s', fontFamily: 'var(--font-body)' }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = 'var(--shadow-md)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <FaGoogle size={20} color="#4285F4" />
            Continue with Google
          </button>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', marginTop: 20, lineHeight: 1.6 }}>
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
