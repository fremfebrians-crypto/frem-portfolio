'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CommentItem, LinkedinUser } from '@/types/comment';
import CommentCard from './CommentCard';
import LinkedinLoginButton from './LinkedinLoginButton';
import CommentForm from './CommentForm';

export default function CommentCarousel({ initialItems }: { initialItems: CommentItem[] }) {
  const [items] = useState(initialItems);
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState<LinkedinUser | null>(null);
  const [checking, setChecking] = useState(true);

  const visible = useMemo(() => {
    if (items.length <= 3) return items;
    return [0, 1, 2].map((offset) => items[(index + offset) % items.length]);
  }, [items, index]);

  useEffect(() => {
    if (items.length <= 3) return;
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length]);

  useEffect(() => {
    fetch('/api/auth/linkedin/me')
      .then((res) => res.json())
      .then((json) => {
        if (json.authenticated) setUser(json.user);
      })
      .finally(() => setChecking(false));
  }, []);

  return (
    <div className="comments-block" id="comments">
      <div className="section-head compact-head">
        <div>
          <p className="section-kicker">COMMENTS</p>
          <h3>Partner Kerja</h3>
        </div>
      </div>

      {items.length ? (
        <div className="comments-grid">
          {visible.map((item) => <CommentCard key={item.id} item={item} />)}
        </div>
      ) : (
        <div className="empty-box card">
          Belum ada komentar. Komentar akan tampil setelah login LinkedIn dan disetujui admin.
        </div>
      )}

      <div className="comment-login-panel card">
        {checking ? <p>Checking LinkedIn session...</p> : null}

        {!checking && !user ? (
          <>
            <p>Login with LinkedIn terlebih dahulu untuk mengirim komentar.</p>
            <LinkedinLoginButton />
          </>
        ) : null}

        {!checking && user ? (
          <>
            <div className="comment-author">
              <img
                className="comment-avatar"
                src={user.picture || '/images/placeholders/avatar-placeholder.png'}
                alt={user.name}
              />
              <div>
                <strong>{user.name}</strong>
                <span>{user.title || 'LinkedIn Member'}</span>
              </div>
            </div>

            <CommentForm />

            <form action="/api/auth/linkedin/logout" method="post">
              <button className="btn btn-secondary" type="submit">
                Logout LinkedIn
              </button>
            </form>
          </>
        ) : null}
      </div>
    </div>
  );
}