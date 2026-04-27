'use client';

import { useState } from 'react';
import type { PortfolioItem } from '@/types/portfolio';

export default function PortfolioForm({ item }: { item?: PortfolioItem }) {
  const [status, setStatus] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('Saving...');
    const form = new FormData(e.currentTarget);
    const endpoint = item ? `/api/portfolio/${item.id}` : '/api/portfolio';
    const method = item ? 'PUT' : 'POST';
    const res = await fetch(endpoint, { method, body: form });
    setStatus(res.ok ? 'Saved.' : 'Failed to save.');
    if (res.ok && !item) e.currentTarget.reset();
  }

  return (
    <form className="admin-form card" onSubmit={onSubmit}>
      <div className="admin-grid-two">
        <label>Title<input name="title" defaultValue={item?.title} required /></label>
        <label>Category<input name="category" defaultValue={item?.category || ''} /></label>
        <label>Type<select name="type" defaultValue={item?.type || 'image'}><option value="image">Image</option><option value="excel">Excel Preview</option></select></label>
        <label>Status<select name="status" defaultValue={item?.status || 'draft'}><option value="draft">Draft</option><option value="published">Published</option></select></label>
        <label>Sort Order<input type="number" name="sortOrder" defaultValue={item?.sortOrder ?? 0} /></label>
        <label>Description<textarea name="description" defaultValue={item?.description || ''} /></label>
        <label>Thumbnail<input type="file" name="thumbnail" accept="image/*" /></label>
        <label>Preview Image<input type="file" name="image" accept="image/*" /></label>
        <label>Excel File<input type="file" name="excel" accept=".xls,.xlsx" /></label>
      </div>
      <button className="btn btn-primary" type="submit">{item ? 'Update Portfolio' : 'Create Portfolio'}</button>
      <p className="admin-form-status">{status}</p>
    </form>
  );
}
