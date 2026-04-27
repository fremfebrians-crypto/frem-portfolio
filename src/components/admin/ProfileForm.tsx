'use client';

import { useState } from 'react';
import type { SiteProfile } from '@/types/profile';

export default function ProfileForm({ profile }: { profile: SiteProfile }) {
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setStatus('Saving profile...');

    try {
      const form = new FormData(e.currentTarget);
      const payload = Object.fromEntries(form.entries());

      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setStatus('✅ Profile berhasil disimpan.');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus(`❌ ${data.error || 'Gagal menyimpan profile.'}`);
      }
    } catch {
      setStatus('❌ Terjadi kesalahan saat menyimpan profile.');
    } finally {
      setSaving(false);
    }
  }

  async function uploadAsset(
    e: React.ChangeEvent<HTMLInputElement>,
    endpoint: string,
    fieldName: string,
    label: string
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus(`Uploading ${label}...`);

    try {
      // Step 1: Upload file
      const form = new FormData();
      form.append('file', file);

      const uploadRes = await fetch(endpoint, { method: 'POST', body: form });

      if (!uploadRes.ok) {
        const data = await uploadRes.json().catch(() => ({}));
        setStatus(`❌ Gagal upload ${label}: ${data.error || 'Unknown error'}`);
        return;
      }

      const json = await uploadRes.json();
      const filePath = json.path || json.publicPath;

      if (!filePath) {
        setStatus(`❌ Upload ${label} berhasil tapi path tidak ditemukan.`);
        return;
      }

      // Step 2: Update profile with the new file path
      const updateRes = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [fieldName]: filePath }),
      });

      if (updateRes.ok) {
        setStatus(`✅ ${label} berhasil diupdate.`);
      } else {
        setStatus(`❌ File terupload tapi gagal update profile.`);
      }
    } catch {
      setStatus(`❌ Terjadi kesalahan saat upload ${label}.`);
    }
  }

  return (
    <form className="admin-form card" onSubmit={updateProfile}>
      <div className="admin-grid-two">
        <label>Full Name<input name="fullName" defaultValue={profile.fullName} /></label>
        <label>Logo Text<input name="logoText" defaultValue={profile.logoText} /></label>
        <label>Tagline<input name="tagline" defaultValue={profile.tagline} /></label>
        <label>Hero Title 1<input name="heroTitle1" defaultValue={profile.heroTitle1} /></label>
        <label>Hero Title 2<input name="heroTitle2" defaultValue={profile.heroTitle2} /></label>
        <label>Birth Date<input name="birthDate" defaultValue={profile.birthDate} /></label>
        <label>Address<input name="address" defaultValue={profile.address} /></label>
        <label>Zip Code<input name="zipCode" defaultValue={profile.zipCode || ''} /></label>
        <label>Email<input name="email" defaultValue={profile.email} /></label>
        <label>Phone<input name="phone" defaultValue={profile.phone} /></label>
        <label>LinkedIn URL<input name="linkedinUrl" defaultValue={profile.linkedinUrl} /></label>
        <label>Base Location<input name="baseLocation" defaultValue={profile.baseLocation} /></label>
        <label className="admin-full-width">About Text<textarea name="aboutText" defaultValue={profile.aboutText} /></label>
      </div>

      <div className="admin-upload-row">
        <label>
          Update Hero Photo
          <input
            type="file"
            accept="image/*"
            onChange={(e) => uploadAsset(e, '/api/upload/image?target=hero', 'heroPhotoPath', 'Hero Photo')}
          />
          {profile.heroPhotoPath && (
            <span style={{ fontSize: 13, color: '#666', marginTop: 4 }}>✅ Hero photo sudah ada</span>
          )}
        </label>

        <label>
          Update CV (PDF)
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => uploadAsset(e, '/api/upload/cv', 'cvPath', 'CV')}
          />
          {profile.cvPath && (
            <span style={{ fontSize: 13, color: '#666', marginTop: 4 }}>✅ CV sudah ada</span>
          )}
        </label>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <button className="btn btn-primary" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </button>

        {profile.cvPath && (
          <a
            className="btn btn-secondary admin-small-btn"
            href="/api/profile?download=cv"
            target="_blank"
            rel="noreferrer"
          >
            📄 Preview CV
          </a>
        )}
      </div>

      {status && <p className="admin-form-status">{status}</p>}
    </form>
  );
}
