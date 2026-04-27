'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const items = [
  ['Dashboard', '/admin/dashboard'],
  ['Profile', '/admin/profile'],
  ['Portfolio', '/admin/portfolio'],
  ['Blog', '/admin/blog'],
  ['Comments', '/admin/comments'],
  ['Settings', '/admin/settings']
] as const;

export default function AdminSidebar() {
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);

    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // ignore errors
    }

    // Force full page redirect to login
    window.location.href = '/admin/login';
  }

  return (
    <aside className="admin-sidebar">
      <div>
        <p className="section-kicker">ADMIN PANEL</p>
        <h2>Frem Portfolio</h2>
      </div>
      <nav className="admin-nav">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? 'is-active' : ''}
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        className="btn btn-secondary admin-logout-btn"
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
      >
        {loggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </aside>
  );
}
