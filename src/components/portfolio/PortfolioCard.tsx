type PortfolioItem = {
  id: string;
  title: string;
  category: string | null;
  type: 'image' | 'excel' | 'pdf';
  thumbnailPath: string | null;
  imagePath: string | null;
  excelPath: string | null;
  pdfPath: string | null;
  description: string | null;
  status: string;
  sortOrder: number;
};

export default function PortfolioCard({
  item,
  onOpen,
}: {
  item: PortfolioItem;
  onOpen: () => void;
}) {
  const thumbnailSrc = item.thumbnailPath
    ? item.thumbnailPath.startsWith('/api/profile')
      ? item.thumbnailPath
      : `/api/profile?asset=${encodeURIComponent(item.thumbnailPath)}`
    : '/placeholder-image.png';

  const isExcel = item.type === 'excel';
  const isPdf = item.type === 'pdf';

  function getTypeLabel() {
    if (isPdf) return 'PDF DOCUMENT';
    if (isExcel) return 'EXCEL TEMPLATE';
    return 'IMAGE PREVIEW';
  }

  return (
    <div className="portfolio-card card">
      <img
        src={thumbnailSrc}
        alt={item.title}
        className="portfolio-thumb"
      />

      <div className="portfolio-body">
        <p className="section-kicker">
          {getTypeLabel()}
        </p>

        <h3>{item.title}</h3>

        <p className="portfolio-description">
          {item.description || 'Preview only'}
        </p>

        {isPdf ? (
          <div className="portfolio-btn-group">
            <button
              type="button"
              onClick={onOpen}
              className="btn btn-primary portfolio-download-btn"
            >
              📄 View PDF
            </button>
            <a
              href={`/api/portfolio/download/${item.id}`}
              className="btn btn-secondary portfolio-download-btn"
            >
              ⬇ Download
            </a>
          </div>
        ) : isExcel ? (
          <a
            href={`/api/portfolio/download/${item.id}`}
            className="btn btn-primary portfolio-download-btn"
          >
            Download Excel
          </a>
        ) : (
          <button
            type="button"
            onClick={onOpen}
            className="btn btn-secondary portfolio-download-btn"
          >
            View Image
          </button>
        )}
      </div>
    </div>
  );
}