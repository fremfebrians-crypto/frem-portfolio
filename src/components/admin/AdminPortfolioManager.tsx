'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

type PortfolioItem = {
  id: string;
  title: string;
  category: string | null;
  type: 'image' | 'excel' | 'pdf';
  description: string | null;
  status: string;
  sortOrder: number;
  thumbnailPath: string | null;
  imagePath: string | null;
  excelPath: string | null;
  pdfPath: string | null;
};

type FormState = {
  title: string;
  category: string;
  type: 'image' | 'excel' | 'pdf';
  description: string;
  status: string;
  sortOrder: string;
};

const emptyForm: FormState = {
  title: '',
  category: '',
  type: 'image',
  description: '',
  status: 'draft',
  sortOrder: '0',
};


export default function AdminPortfolioManager({
  items,
}: {
  items: PortfolioItem[];
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [formKey, setFormKey] = useState(0);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage('');
    setFormKey((v) => v + 1);
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);

    setForm({
      title: item.title,
      category: item.category || '',
      type: item.type,
      description: item.description || '',
      status: item.status,
      sortOrder: String(item.sortOrder),
    });

    setMessage('');
    setFormKey((v) => v + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    try {
      const res = await fetch(
        editingId ? `/api/portfolio/${editingId}` : '/api/portfolio',
        {
          method: editingId ? 'PUT' : 'POST',
          body: formData,
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.details || data.error || 'Gagal menyimpan portfolio.');
        setSubmitting(false);
        return;
      }

      setMessage(
        editingId
          ? 'Portfolio berhasil diupdate.'
          : 'Portfolio berhasil ditambahkan.'
      );

      resetForm();

      setTimeout(() => {
        window.location.reload();
      }, 700);
    } catch {
      setMessage('Terjadi kesalahan saat menyimpan portfolio.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    const ok = window.confirm('Yakin mau hapus portfolio ini?');
    if (!ok) return;

    setSubmitting(true);
    setMessage('');

    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMessage(data.details || data.error || 'Gagal menghapus portfolio.');
        setSubmitting(false);
        return;
      }

      setMessage('Portfolio berhasil dihapus.');

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch {
      setMessage('Terjadi kesalahan saat menghapus portfolio.');
    } finally {
      setSubmitting(false);
    }
  }

  function getFileInputForType() {
    if (form.type === 'image') {
      return (
        <label>
          <span>{editingId ? 'Replace Image File' : 'Image File'}</span>
          <input name="image" type="file" accept="image/*" />
        </label>
      );
    }

    if (form.type === 'excel') {
      return (
        <label>
          <span>{editingId ? 'Replace Excel File' : 'Excel File'}</span>
          <input
            name="excel"
            type="file"
            accept=".xls,.xlsx,.xlsm,.csv"
          />
        </label>
      );
    }

    if (form.type === 'pdf') {
      return (
        <label>
          <span>{editingId ? 'Replace PDF File' : 'PDF File'}</span>
          <input
            name="pdf"
            type="file"
            accept=".pdf"
          />
        </label>
      );
    }

    return null;
  }

  function getFileStatus(item: PortfolioItem) {
    if (item.type === 'pdf') return item.pdfPath ? 'Yes' : 'No';
    return item.imagePath || item.excelPath ? 'Yes' : 'No';
  }

  return (
    <div className="admin-portfolio-grid">
      <div className="admin-card">
        <div className="admin-card-head admin-card-head-row">
          <div>
            <h3>{editingId ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h3>
            <p>
              {editingId
                ? 'Ubah data portfolio. Upload thumbnail/file baru kalau mau mengganti file lama.'
                : 'Upload thumbnail dan file utama sesuai tipe item.'}
            </p>
          </div>

          {editingId ? (
            <button
              type="button"
              className="btn btn-secondary admin-small-btn"
              onClick={resetForm}
              disabled={submitting}
            >
              Cancel Edit
            </button>
          ) : null}
        </div>

        <form key={formKey} className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-form-grid">
            <label>
              <span>Title</span>
              <input
                name="title"
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </label>

            <label>
              <span>Category</span>
              <input
                name="category"
                type="text"
                placeholder="Financial Report"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
              />
            </label>

            <label>
              <span>Type</span>
              <select
                name="type"
                value={form.type}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    type: e.target.value as 'image' | 'excel' | 'pdf',
                  }))
                }
              >
                <option value="image">Image</option>
                <option value="excel">Excel File</option>
                <option value="pdf">PDF Document</option>
              </select>
            </label>

            <label>
              <span>Status</span>
              <select
                name="status"
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label>
              <span>Sort Order</span>
              <input
                name="sortOrder"
                type="number"
                min={0}
                value={form.sortOrder}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, sortOrder: e.target.value }))
                }
              />
            </label>
          </div>

          <label>
            <span>Description</span>
            <textarea
              name="description"
              rows={4}
              placeholder="Deskripsi singkat item portfolio"
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </label>

          <div className="admin-form-grid">
            <label>
              <span>{editingId ? 'Replace Thumbnail' : 'Thumbnail'}</span>
              <input name="thumbnail" type="file" accept="image/*" />
            </label>

            {getFileInputForType()}
          </div>

          <div className="admin-form-actions">
            <button className="btn btn-primary" type="submit" disabled={submitting}>
              {submitting
                ? editingId
                  ? 'Updating...'
                  : 'Saving...'
                : editingId
                ? 'Update Portfolio'
                : 'Save Portfolio'}
            </button>

            {message ? <p className="admin-form-message">{message}</p> : null}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <div className="admin-card-head">
          <h3>Portfolio List</h3>
          <p>Total item: {items.length}</p>
        </div>

        {!items.length ? (
          <div className="admin-empty-box">
            Belum ada portfolio. Tambahkan item pertama dari form di kiri.
          </div>
        ) : (
          <div className="admin-portfolio-list">
            {items.map((item) => (
              <div key={item.id} className="admin-portfolio-item">
                <div className="admin-portfolio-item-top">
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description || 'Tanpa deskripsi'}</p>
                  </div>

                  <div className="admin-badges">
                    <span className="admin-badge">{item.type}</span>
                    <span className="admin-badge">{item.status}</span>
                  </div>
                </div>

                <div className="admin-portfolio-meta">
                  <span>Category: {item.category || '-'}</span>
                  <span>Sort: {item.sortOrder}</span>
                  <span>Thumbnail: {item.thumbnailPath ? 'Yes' : 'No'}</span>
                  <span>
                    File: {getFileStatus(item)}
                  </span>
                </div>

                <div className="admin-item-actions">
                  <button
                    type="button"
                    className="btn btn-secondary admin-small-btn"
                    onClick={() => startEdit(item)}
                    disabled={submitting}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger admin-small-btn"
                    onClick={() => handleDelete(item.id)}
                    disabled={submitting}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}