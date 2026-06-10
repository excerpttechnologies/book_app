import Navbar from '@/components/user/Navbar';
import Footer from '@/components/user/Footer';
import AdDisplay from '@/components/user/AdDisplay';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <AdDisplay />
    </div>
  );
}
