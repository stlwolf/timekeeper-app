import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Timekeeper App',
  description: 'A simple timekeeper application',
  manifest: '/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Timekeeper App',
  },
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icon-512x512.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} ${quicksand.className}`}>{children}</body>
    </html>
  );
}
