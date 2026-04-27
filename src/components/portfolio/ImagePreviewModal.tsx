'use client';

export default function ImagePreviewModal({ open, onClose, src, title }: { open: boolean; onClose: () => void; src?: string | null; title?: string }) {
  if (!open || !src) return null;
  return (
    <div className="preview-modal" onClick={onClose}>
      <div className="preview-modal-card card" onClick={(e) => e.stopPropagation()}>
        <button className="preview-close" type="button" onClick={onClose}>✕</button>
        <h3>{title}</h3>
        <img src={src} alt={title || 'Preview image'} className="preview-image" />
      </div>
    </div>
  );
}
