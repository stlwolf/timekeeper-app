import type { Metadata } from 'next';
import { Inter, Quicksand } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Timekeeper App',
  description: 'A simple timekeeper application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${quicksand.variable}`}>{children}</body>
    </html>
  );
}
