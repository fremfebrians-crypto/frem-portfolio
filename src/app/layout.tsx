import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frem Pebrianta Tarigan | Portfolio',
  description: 'Portfolio website for Frem Pebrianta Tarigan.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
