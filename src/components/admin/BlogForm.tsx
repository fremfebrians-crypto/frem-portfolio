'use client';

import { useState } from 'react';

export default function BlogForm({ item }: { item?: { id?: string; title?: string | null; slug?: string | null; excerpt?: string | null; status?: string | null; publishDate?: string | null } }) {
  const [status, setStatus] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('Saving...');
    const form = new FormData(e.currentTarget);
    const endpoint = item?.id ? `/api/blog/${item.id}` : '/api/blog';
    const method = item?.id ? 'PUT' : 'POST';
    const res = await fetch(endpoint, { method, body: form });
    setStatus(res.ok ? 'Saved.' : 'Failed to save.');
    if (res.ok && !item?.id) e.currentTarget.reset();
  }

  return (
    <form className="admin-form card" onSubmit={onSubmit}>
      <div className="admin-grid-two">
        <label>Title<input name="title" defaultValue={item?.title || ''} required /></label>
        <label>Slug<input name="slug" defaultValue={item?.slug || ''} required /></label>
        <label>Excerpt<textarea name="excerpt" defaultValue={item?.excerpt || ''} /></label>
        <label>Status<select name="status" defaultValue={item?.status || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label>Publish Date<input type="date" name="publishDate" defaultValue={item?.publishDate ? item.publishDate.slice(0, 10) : ''} /></label>
        <label>Thumbnail<input type="file" name="thumbnail" accept="image/*" /></label>
        <label>HTML File<input type="file" name="file" accept=".html,text/html" /></label>
      </div>
      <button className="btn btn-primary" type="submit">{item?.id ? 'Update Blog Post' : 'Create Blog Post'}</button>
      <p className="admin-form-status">{status}</p>
    </form>
  );
}
