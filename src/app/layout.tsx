'use client';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Saraswati Books</title>
        <meta name="description" content="Premium divine books store" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SessionProvider>
          <ThemeProvider>
            {children}
            <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: 'var(--surface)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontFamily: 'var(--font-body)', fontSize: '14px' } }} />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
