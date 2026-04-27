'use client';

import { useState } from 'react';
import type { CommentItem } from '@/types/comment';

export default function CommentModerationTable({ initialItems }: { initialItems: CommentItem[] }) {
  const [items, setItems] = useState(initialItems);

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) return;
    setItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
  }

  async function remove(id: string) {
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    if (!res.ok) return;
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <div className="admin-comments-list">
      {items.map((item) => (
        <div key={item.id} className="card admin-comment-item">
          <div>
            <h3>{item.linkedinName}</h3>
            <p>{item.linkedinTitle || 'LinkedIn Member'} . {item.status}</p>
            <p>{item.message}</p>
          </div>
          <div className="admin-inline-actions">
            <button className="btn btn-primary" type="button" onClick={() => updateStatus(item.id, 'approved')}>Approve</button>
            <button className="btn btn-secondary" type="button" onClick={() => updateStatus(item.id, 'rejected')}>Reject</button>
            <button className="btn btn-secondary" type="button" onClick={() => remove(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
