'use client';

type ExcelPreviewModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string | null;
};

function toPreviewUrl(url: string | null) {
  if (!url) return null;

  const driveFileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveFileMatch) {
    return `https://drive.google.com/file/d/${driveFileMatch[1]}/preview`;
  }

  const sheetMatch = url.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/);
  if (sheetMatch) {
    return `https://docs.google.com/spreadsheets/d/${sheetMatch[1]}/preview`;
  }

  return url;
}

export default function ExcelPreviewModal({
  open,
  onClose,
  title,
  url,
}: ExcelPreviewModalProps) {
  if (!open) return null;

  const previewUrl = toPreviewUrl(url);

  return (
    <div className="preview-modal" onClick={onClose}>
      <div
        className="preview-modal-card card large excel-preview-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="preview-close" type="button" onClick={onClose}>
          ✕
        </button>

        <div className="excel-preview-head">
          <h3>{title}</h3>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary admin-small-btn"
            >
              Open in Drive
            </a>
          ) : null}
        </div>

        {previewUrl ? (
          <iframe
            src={previewUrl}
            title={title}
            className="excel-preview-iframe"
          />
        ) : (
          <p>Link preview belum tersedia.</p>
        )}
      </div>
    </div>
  );
}