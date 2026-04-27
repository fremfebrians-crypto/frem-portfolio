export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Frem Pebrianta Tarigan | Portfolio',
  description: 'Portfolio website for Frem Pebrianta Tarigan.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}