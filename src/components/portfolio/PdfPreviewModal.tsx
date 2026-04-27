'use client';

type PdfPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  pdfUrl: string;
  downloadUrl: string;
};

export default function PdfPreviewModal({
  open,
  onClose,
  title,
  pdfUrl,
  downloadUrl,
}: PdfPreviewModalProps) {
  if (!open) return null;

  return (
    <div className="preview-modal" onClick={onClose}>
      <div
        className="preview-modal-card card large pdf-preview-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="preview-close" type="button" onClick={onClose}>
          ✕
        </button>

        <div className="pdf-preview-head">
          <h3>{title}</h3>
          <div className="pdf-preview-actions">
            <a
              href={downloadUrl}
              className="btn btn-primary admin-small-btn"
              download
            >
              ⬇ Download PDF
            </a>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary admin-small-btn"
            >
              Open in New Tab
            </a>
          </div>
        </div>

        <iframe
          src={pdfUrl}
          title={title}
          className="pdf-preview-iframe"
        />
      </div>
    </div>
  );
}
