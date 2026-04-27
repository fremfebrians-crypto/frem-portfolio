'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (!email.trim()) {
      setError('Email wajib diisi.');
      return;
    }

    if (!password.trim()) {
      setError('Password wajib diisi.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Login gagal. Periksa email dan password.');
        setLoading(false);
        return;
      }

      // Use full page navigation to ensure middleware re-runs
      window.location.href = '/admin/dashboard';
    } catch {
      setError('Terjadi kesalahan. Coba lagi.');
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-screen">
      <form className="admin-login-card card" onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div className="brand-mark" style={{ margin: '0 auto 12px', width: 56, height: 56, fontSize: 20, background: '#111', color: '#fff', display: 'grid', placeItems: 'center', borderRadius: 14 }}>
            FF
          </div>
          <h1 style={{ margin: '0 0 4px', fontSize: 28 }}>Admin Login</h1>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>
            Masuk untuk mengelola portfolio dan profile.
          </p>
        </div>

        <label>
          <span style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Email</span>
          <input
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            autoComplete="email"
            required
          />
        </label>

        <label>
          <span style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 14 }}>Password</span>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            autoComplete="current-password"
            required
          />
        </label>

        <button
          className="btn btn-primary"
          type="submit"
          disabled={loading}
          style={{ width: '100%', marginTop: 4 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p style={{ margin: 0, color: '#b42318', fontSize: 14, textAlign: 'center', background: '#fef3f2', padding: '10px 14px', borderRadius: 10 }}>
            {error}
          </p>
        )}
      </form>
    </main>
  );
}