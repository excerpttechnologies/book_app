

'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  FiSearch, FiHeart, FiShoppingCart, FiUser, FiMenu, FiX,
  FiSun, FiMoon, FiChevronDown, FiLogOut, FiPackage, FiPhone, FiHelpCircle,
  FiHome, FiGrid, FiTag
} from 'react-icons/fi';
import { useTheme } from '@/components/shared/ThemeProvider';

const categories = [
  'Books', 'God Photos', 'Framed Calendar', 'Wall Hanging', 'Musical Box', 'Other Items'
];
const languages = ['Tamil', 'Telugu', 'English'];

// ─── Design tokens ─────────────────────────────────────────────────────────
const NAVY   = 'rgb(11, 11, 11)';
const GRAD   = 'linear-gradient(135deg, rgb(153, 187, 207) 0%, rgb(148, 193, 224) 100%)';
const LIGHT  = '#eef5fa';
const BORDER = '#d4e4ef';
const MUTED  = '#5489b4';
const BG     = '#f5f9fc';

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const [mobileOpen, setMobileOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [cartCount, setCartCount]         = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [userMenuOpen, setUserMenuOpen]   = useState(false);
  const [scrolled, setScrolled]           = useState(false);
  const [mobileSearch, setMobileSearch]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (session) {
      fetch('/api/cart')
        .then(r => r.json())
        .then(d => setCartCount(d.cart?.length || 0))
        .catch(() => {});
      fetch('/api/wishlist')
        .then(r => r.json())
        .then(d => setWishlistCount(d.wishlist?.length || 0))
        .catch(() => {});
    }
  }, [session]);

  // Close menus when clicking outside
  useEffect(() => {
    const close = () => { setUserMenuOpen(false); };
    if (userMenuOpen) document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [userMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setMobileSearch(false);
      setMobileOpen(false);
    }
  };

  const iconBtn: React.CSSProperties = {
    position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 38, height: 38, borderRadius: 10,
    background: 'none', border: 'none', cursor: 'pointer',
    color: MUTED, transition: 'background 0.15s, color 0.15s',
    flexShrink: 0,
  };

  const badge: React.CSSProperties = {
    position: 'absolute', top: 2, right: 2,
    background: NAVY, color: '#fff',
    borderRadius: '50%', width: 16, height: 16,
    fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700,
  };

  return (
    <>
      {/* ── Global responsive styles ─────────────────────────────────────── */}
      <style>{`
        .nav-desktop-search { display: flex !important; }
        .nav-mobile-search-btn { display: none !important; }
        .nav-desktop-cats { display: flex !important; }
        .nav-mobile-menu-btn { display: none !important; }
        .nav-top-bar-right { display: flex !important; }

        @media (max-width: 768px) {
          .nav-desktop-search { display: none !important; }
          .nav-mobile-search-btn { display: flex !important; }
          .nav-desktop-cats { display: none !important; }
          .nav-mobile-menu-btn { display: flex !important; }
          .nav-top-bar-right { display: none !important; }
          .nav-logo-sub { display: none !important; }
          .nav-theme-toggle { display: none !important; }
        }

        @media (max-width: 480px) {
          .nav-wishlist-btn { display: none !important; }
        }

        .nav-cat-link:hover {
          background: ${LIGHT} !important;
          color: ${NAVY} !important;
          border-color: ${BORDER} !important;
        }
        .nav-lang-link:hover {
          background: ${GRAD} !important;
          border-color: transparent !important;
        }
        .nav-icon-hover:hover {
          background: ${LIGHT} !important;
          color: ${NAVY} !important;
        }
        .nav-mobile-cat:active {
          background: ${LIGHT};
        }
      `}</style>

      <nav style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: '#fff',
        borderBottom: `1px solid ${BORDER}`,
        boxShadow: scrolled ? '0 2px 12px rgba(44,62,80,0.08)' : 'none',
        transition: 'box-shadow 0.2s',
      }}>

        {/* ── Top bar ────────────────────────────────────────────────────── */}
        <div style={{ background: GRAD, padding: '6px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: NAVY, fontSize: 12, fontWeight: 500 }}>
            🕉 Free shipping on orders above ₹999
          </span>
          <div className="nav-top-bar-right" style={{ alignItems: 'center', gap: 20 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: NAVY, fontSize: 12, fontWeight: 500 }}>
              <FiPhone size={11} /> +91 7871721995
            </span>
            <Link href="/help" style={{ display: 'flex', alignItems: 'center', gap: 4, color: NAVY, fontSize: 12, fontWeight: 500, textDecoration: 'none' }}>
              <FiHelpCircle size={11} /> Help
            </Link>
            <Link href="/orders" style={{ color: NAVY, fontSize: 12, fontWeight: 500, textDecoration: 'none' }}>
              Track Order
            </Link>
          </div>
        </div>

        {/* ── Main row ───────────────────────────────────────────────────── */}
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '10px 20px',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>

          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/uploads/logo/OM.png"
              alt="OM Spiritual"
              style={{ width: 64, height: 54, objectFit: 'contain' }}
            />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700, color: NAVY, lineHeight: 1.15 }}>
                OM Spiritual
              </div>
              <div className="nav-logo-sub" style={{ fontSize: 10, color: MUTED, fontWeight: 400, letterSpacing: '0.3px' }}>
                Sacred Books &amp; More
              </div>
            </div>
          </Link>

          {/* Desktop search */}
          <form
            className="nav-desktop-search"
            onSubmit={handleSearch}
            style={{ flex: 1, maxWidth: 460, position: 'relative' }}
          >
            <input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search books, authors, categories..."
              style={{
                width: '100%', height: 38,
                border: `1.5px solid ${BORDER}`,
                borderRadius: 50, padding: '0 42px 0 16px',
                fontSize: 13.5, color: NAVY, background: BG,
                outline: 'none',
              }}
              onFocus={e => { e.target.style.borderColor = 'rgb(135,174,201)'; e.target.style.background = '#fff'; }}
              onBlur={e  => { e.target.style.borderColor = BORDER; e.target.style.background = BG; }}
            />
            <button type="submit" style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: MUTED, display: 'flex' }}>
              <FiSearch size={17} />
            </button>
          </form>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 'auto', flexShrink: 0 }}>

            {/* Mobile search icon */}
            <button
              className="nav-mobile-search-btn nav-icon-hover"
              onClick={() => setMobileSearch(!mobileSearch)}
              style={iconBtn}
              aria-label="Search"
            >
              <FiSearch size={19} />
            </button>

            {/* Theme toggle (hidden on mobile) */}
            <button
              className="nav-theme-toggle nav-icon-hover"
              onClick={toggleTheme}
              style={iconBtn}
              title="Toggle theme"
            >
              {theme === 'dark' ? <FiSun size={19} /> : <FiMoon size={19} />}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="nav-wishlist-btn nav-icon-hover"
              style={{ ...iconBtn, color: MUTED }}
              aria-label="Wishlist"
            >
              <FiHeart size={19} />
              {wishlistCount > 0 && <span style={badge}>{wishlistCount}</span>}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="nav-icon-hover"
              style={{ ...iconBtn, color: MUTED }}
              aria-label="Cart"
            >
              <FiShoppingCart size={19} />
              {cartCount > 0 && <span style={badge}>{cartCount}</span>}
            </Link>

            {/* Divider */}
            <div style={{ width: 1, height: 22, background: BORDER, margin: '0 2px' }} />

            {/* User area */}
            {session ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={e => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '5px 10px 5px 5px',
                    background: BG, border: `1.5px solid ${BORDER}`,
                    borderRadius: 50, cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgb(135,174,201)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = BORDER)}
                >
                  {session.user?.image ? (
                    <img src={session.user.image} alt="" style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: GRAD,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 600, color: NAVY,
                    }}>
                      {session.user?.name?.slice(0, 2).toUpperCase() || 'U'}
                    </div>
                  )}
                  {/* Hide name on small screens */}
                  <span style={{ fontSize: 13, fontWeight: 500, color: NAVY, maxWidth: 70, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                    className="nav-user-name">
                    {session.user?.name?.split(' ')[0]}
                  </span>
                  <FiChevronDown size={12} color={MUTED} />
                </button>

                {userMenuOpen && (
                  <div
                    onClick={e => e.stopPropagation()}
                    style={{
                      position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                      background: '#fff', border: `1px solid ${BORDER}`,
                      borderRadius: 12, boxShadow: '0 8px 24px rgba(44,62,80,0.13)',
                      minWidth: 188, zIndex: 200, overflow: 'hidden',
                    }}>
                    <div style={{ padding: '12px 16px 10px', borderBottom: `1px solid ${BORDER}` }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{session.user?.name}</div>
                      <div style={{ fontSize: 11.5, color: MUTED, marginTop: 1 }}>{session.user?.email}</div>
                    </div>
                    <Link href="/profile" onClick={() => setUserMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13.5, color: NAVY, borderBottom: `1px solid ${BORDER}`, textDecoration: 'none' }}>
                      <FiUser size={15} color={MUTED} /> My Profile
                    </Link>
                    <Link href="/orders" onClick={() => setUserMenuOpen(false)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13.5, color: NAVY, borderBottom: `1px solid ${BORDER}`, textDecoration: 'none' }}>
                      <FiPackage size={15} color={MUTED} /> My Orders
                    </Link>
                    {(session.user as any)?.role === 'admin' && (
                      <Link href="/admin/dashboard" onClick={() => setUserMenuOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13.5, color: NAVY, fontWeight: 600, borderBottom: `1px solid ${BORDER}`, textDecoration: 'none', background: BG }}>
                        🛡️ Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { signOut(); setUserMenuOpen(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', fontSize: 13.5, color: '#e05252', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}>
                      <FiLogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn('google')}
                style={{
                  padding: '7px 16px', borderRadius: 50,
                  background: GRAD, border: 'none',
                  fontSize: 13, fontWeight: 600, color: NAVY,
                  cursor: 'pointer', transition: 'opacity 0.15s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Sign In
              </button>
            )}

            {/* Hamburger */}
            <button
              className="nav-mobile-menu-btn nav-icon-hover"
              onClick={() => { setMobileOpen(!mobileOpen); setMobileSearch(false); }}
              style={{ ...iconBtn, marginLeft: 2 }}
              aria-label="Menu"
            >
              {mobileOpen ? <FiX size={21} /> : <FiMenu size={21} />}
            </button>
          </div>
        </div>

        {/* ── Mobile search bar (slides in) ──────────────────────────────── */}
        {mobileSearch && (
          <div style={{ padding: '0 16px 12px', background: '#fff', borderTop: `1px solid ${BORDER}` }}>
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
              <input
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, categories..."
                style={{
                  width: '100%', height: 40,
                  border: `1.5px solid ${BORDER}`, borderRadius: 50,
                  padding: '0 44px 0 16px', fontSize: 14,
                  color: NAVY, background: BG, outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgb(135,174,201)'; e.target.style.background = '#fff'; }}
                onBlur={e  => { e.target.style.borderColor = BORDER; e.target.style.background = BG; }}
              />
              <button type="submit" style={{ position: 'absolute', right: 13, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: MUTED, display: 'flex' }}>
                <FiSearch size={17} />
              </button>
            </form>
          </div>
        )}

        {/* ── Desktop category / language row ───────────────────────────── */}
        <div className="nav-desktop-cats" style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 20px 10px',
          alignItems: 'center', gap: 2, flexWrap: 'wrap',
        }}>
          {categories.map(cat => (
            <Link
              key={cat}
              href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
              className="nav-cat-link"
              style={{
                padding: '5px 13px', fontSize: 14.5, fontWeight: 800,
                color: MUTED, borderRadius: 50,
                border: '1.5px solid transparent',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </Link>
          ))}
          <div style={{ width: 1, height: 16, background: BORDER, margin: '0 6px' }} />
          {languages.map(lang => (
            <Link
              key={lang}
              href={`/shop?language=${lang}`}
              className="nav-lang-link"
              style={{
                padding: '5px 13px', fontSize: 12.5, fontWeight: 600,
                color: NAVY, borderRadius: 50,
                background: BG, border: `1.5px solid ${BORDER}`,
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {lang}
            </Link>
          ))}
        </div>

        {/* ── Mobile slide-down menu ─────────────────────────────────────── */}
        {mobileOpen && (
          <div style={{ background: '#fff', borderTop: `1px solid ${BORDER}` }}>

            {/* Categories section */}
            <div style={{ padding: '8px 0' }}>
              <div style={{ padding: '6px 20px', fontSize: 10.5, fontWeight: 700, color: MUTED, letterSpacing: '0.8px', textTransform: 'uppercase' }}>
                Categories
              </div>
              {categories.map(cat => (
                <Link
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(/ /g, '-')}`}
                  onClick={() => setMobileOpen(false)}
                  className="nav-mobile-cat"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 20px', fontSize: 14.5, fontWeight: 500,
                    color: NAVY, textDecoration: 'none',
                    borderBottom: `1px solid ${BORDER}`,
                    transition: 'background 0.12s',
                  }}
                >
                  <span style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: LIGHT, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, flexShrink: 0,
                  }}>
                    {cat === 'Books' ? '📚' : cat === 'God Photos' ? '🙏' : cat === 'Framed Calendar' ? '🗓️' : cat === 'Wall Hanging' ? '🖼️' : cat === 'Musical Box' ? '🎵' : '✨'}
                  </span>
                  {cat}
                </Link>
              ))}
            </div>

            {/* Language section */}
            <div style={{ padding: '12px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 10 }}>
                Language
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {languages.map(lang => (
                  <Link
                    key={lang}
                    href={`/shop?language=${lang}`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      padding: '8px 18px', borderRadius: 50,
                      background: BG, border: `1.5px solid ${BORDER}`,
                      fontSize: 13.5, fontWeight: 600, color: NAVY,
                      textDecoration: 'none', transition: 'all 0.15s',
                    }}
                  >
                    {lang}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div style={{ padding: '12px 20px 16px', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 50, background: BG, border: `1.5px solid ${BORDER}`, fontSize: 13, color: NAVY, textDecoration: 'none', fontWeight: 500 }}>
                <FiHeart size={14} color={MUTED} /> Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
              </Link>
              <Link href="/cart" onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 50, background: BG, border: `1.5px solid ${BORDER}`, fontSize: 13, color: NAVY, textDecoration: 'none', fontWeight: 500 }}>
                <FiShoppingCart size={14} color={MUTED} /> Cart {cartCount > 0 && `(${cartCount})`}
              </Link>
              <button onClick={toggleTheme}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 50, background: BG, border: `1.5px solid ${BORDER}`, fontSize: 13, color: NAVY, cursor: 'pointer', fontWeight: 500 }}>
                {theme === 'dark' ? <><FiSun size={14} color={MUTED} /> Light</> : <><FiMoon size={14} color={MUTED} /> Dark</>}
              </button>
            </div>

            {/* Sign in / account in mobile */}
            {!session && (
              <div style={{ padding: '0 20px 20px' }}>
                <button
                  onClick={() => signIn('google')}
                  style={{
                    width: '100%', padding: '12px', borderRadius: 50,
                    background: GRAD, border: 'none',
                    fontSize: 14, fontWeight: 600, color: NAVY,
                    cursor: 'pointer',
                  }}
                >
                  Sign In with Google
                </button>
              </div>
            )}

            {session && (
              <div style={{ padding: '0 20px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: BG, borderRadius: 12, marginBottom: 8 }}>
                  {session.user?.image
                    ? <img src={session.user.image} alt="" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
                    : <div style={{ width: 36, height: 36, borderRadius: '50%', background: GRAD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: NAVY }}>
                        {session.user?.name?.slice(0, 2).toUpperCase() || 'U'}
                      </div>
                  }
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: NAVY }}>{session.user?.name}</div>
                    <div style={{ fontSize: 11.5, color: MUTED }}>{session.user?.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  style={{ width: '100%', padding: '11px', borderRadius: 50, background: 'none', border: `1.5px solid #f0c8c8`, fontSize: 13.5, fontWeight: 600, color: '#e05252', cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </>
  );
}