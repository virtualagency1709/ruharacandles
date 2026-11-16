import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Sans, Great_Vibes } from 'next/font/google';
import './globals.css';
import AnnouncementBar from '@/components/store/AnnouncementBar';
import Header from '@/components/store/Header';
import Footer from '@/components/store/Footer';
import MobileNav from '@/components/store/MobileNav';
import CartDrawer from '@/components/store/CartDrawer';
import WhatsAppFloating from '@/components/store/WhatsAppFloating';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-great-vibes',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'Ruhara Candles | Artisanal Candles & Home Decor',
    template: '%s | Ruhara Candles',
  },
  description:
    'Light up your space with love. Artisanal 100% pure organic soy wax candles, brass festive urlis, concrete vessels, and warm Indian home decor.',
  keywords: [
    'Ruhara Candles',
    'Luxury Scented Candles India',
    'Soy Wax Candles',
    'Urli Candles',
    'Festive Diwali Candles',
    'Mithai Candles',
    'Indian Home Decor',
    'Aromatherapy Candles',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://ruharacandles.com',
    siteName: 'Ruhara Candles',
    title: 'Ruhara Candles | Artisanal Candles & Home Decor',
    description: 'Light up your space with love. Artisanal pure soy wax candles and luxury decor.',
    images: [
      {
        url: '/images/logo.svg',
        width: 800,
        height: 800,
        alt: 'Ruhara Candles Luxury Badge',
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#8B5A2B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${greatVibes.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-deep antialiased selection:bg-gold/30 selection:text-deep pb-16 lg:pb-0 paper-grain">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileNav />
        <CartDrawer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
