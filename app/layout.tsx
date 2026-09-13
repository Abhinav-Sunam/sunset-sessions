import type { Metadata, Viewport } from 'next';
import { Toaster } from 'sonner';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#010101',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Sunset Sessions | Music Gatherings in Darjeeling and Gangtok',
  description:
    'Intimate music gatherings across the hills. Curated terrace sessions, sunset views, and community from dusk onward.',
  keywords: [
    'Sunset Sessions',
    'Darjeeling music',
    'Gangtok parties',
    'terrace sessions',
    'electronic music Himalayas',
    'The Buzz Darjeeling'
  ],
  openGraph: {
    title: 'Sunset Sessions | Darjeeling & Gangtok',
    description: 'Intimate music gatherings across the hills. Curated sounds and good company from dusk onward.',
    url: 'https://sunsetsessions.in',
    siteName: 'Sunset Sessions',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <Toaster
          position="bottom-left"
          theme="dark"
          toastOptions={{
            style: {
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border-medium)',
              color: 'var(--color-text-primary)',
              borderRadius: 'var(--radius-md)',
            },
          }}
        />
      </body>
    </html>
  );
}
