import Link from 'next/link';
import { db } from '@/lib/db';

export default async function AdminDashboardPage() {
  const [portfolioCount, blogCount, commentCount, pendingCommentCount] =
    await Promise.all([
      db.portfolioItem.count(),
      db.blogPost.count(),
      db.comment.count(),
      db.comment.count({
        where: {
          status: 'pending',
        },
      }),
    ]);

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">ADMIN</p>
          <h1>Dashboard</h1>
          <p className="admin-subtitle">
            Ringkasan cepat untuk mengelola profile, portfolio, blog, dan komentar.
          </p>
        </div>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span>Total Portfolio</span>
          <strong>{portfolioCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Blog</span>
          <strong>{blogCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Total Komentar</span>
          <strong>{commentCount}</strong>
        </div>

        <div className="admin-stat-card">
          <span>Pending Review</span>
          <strong>{pendingCommentCount}</strong>
        </div>
      </div>

      <div className="admin-quick-grid">
        <Link href="/admin/profile" className="admin-quick-card">
          <h3>Profile</h3>
          <p>Ubah hero photo, CV, dan data profil publik.</p>
        </Link>

        <Link href="/admin/portfolio" className="admin-quick-card">
          <h3>Portfolio</h3>
          <p>Tambah, edit, urutkan, dan publish item portfolio.</p>
        </Link>

        <Link href="/admin/blog" className="admin-quick-card">
          <h3>Blog</h3>
          <p>Upload file HTML artikel dan thumbnail blog.</p>
        </Link>

        <Link href="/admin/comments" className="admin-quick-card">
          <h3>Comments</h3>
          <p>Approve atau tolak komentar dari LinkedIn user.</p>
        </Link>

        <Link href="/admin/settings" className="admin-quick-card">
          <h3>Settings</h3>
          <p>Atur konfigurasi tambahan panel admin.</p>
        </Link>
      </div>
    </div>
  );
}