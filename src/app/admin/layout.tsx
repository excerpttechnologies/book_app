'use client';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '@/components/shared/ThemeProvider';
import {
  FiGrid, FiBook, FiShoppingBag, FiUsers, FiImage, FiMessageSquare,
  FiSettings, FiBarChart2, FiFileText, FiSun, FiMoon, FiBell,
  FiMenu, FiX, FiLogOut, FiStar
} from 'react-icons/fi';

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: FiGrid },
  { href: '/admin/books', label: 'Books', icon: FiBook },
  { href: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { href: '/admin/users', label: 'Users', icon: FiUsers },
  { href: '/admin/ads', label: 'Ads', icon: FiImage },
  { href: '/admin/testimonials', label: 'Testimonials', icon: FiStar },
  { href: '/admin/reports', label: 'Reports', icon: FiBarChart2 },
  { href: '/admin/invoices', label: 'Invoices', icon: FiFileText },
  { href: '/admin/queries', label: 'Queries', icon: FiMessageSquare },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || (session.user as any).role !== 'admin') {
      router.replace('/');
    }
  }, [session, status]);

  if (status === 'loading') {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}><div className="spinner" style={{ width: 40, height: 40 }} /></div>;
  }

  if (!session || (session.user as any).role !== 'admin') return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 39 }} />}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
          <Link
            href="/admin/dashboard"
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <img
              src="/uploads/logo/OM.png"
              alt="OM Spiritual"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />

            <div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  color: "#1F3A52",
                }}
              >
                OM Spiritual
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: "var(--text-muted)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Admin Panel
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px' }}>
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, marginBottom: 2, color: active ? '#1F3A52' : 'var(--text-secondary)', background: active ? 'var(--accent-light)' : 'transparent', fontWeight: active ? 600 : 400, fontSize: 14, transition: 'all 0.15s' }}
                onMouseEnter={e => { if (!active) (e.currentTarget.style.background = 'var(--bg-secondary)'); }}
                onMouseLeave={e => { if (!active) (e.currentTarget.style.background = 'transparent'); }}>
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid var(--border)', position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {session.user?.image
              ? <img src={session.user.image} alt="" style={{ width: 34, height: 34, borderRadius: '50%' }} />
              : <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1F3A52', fontWeight: 700 }}>{session.user?.name?.[0]}</div>}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{session.user?.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Administrator</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-content" style={{ flex: 1 }}>
        {/* Top bar */}
        <div style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text-secondary)', display: 'none' }} className="mobile-menu-btn">
            <FiMenu size={20} />
          </button>
          <div style={{ flex: 1 }} />
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--text-secondary)', borderRadius: 8 }}>
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          <Link href="/" style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            View Store
          </Link>
        </div>

        <div style={{ padding: 24 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
