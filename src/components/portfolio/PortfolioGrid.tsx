'use client';

import { useState } from 'react';
import PortfolioCard from './PortfolioCard';
import ImagePreviewModal from './ImagePreviewModal';
import PdfPreviewModal from './PdfPreviewModal';

type PortfolioItem = {
  id: string;
  title: string;
  category: string | null;
  type: 'image' | 'excel' | 'pdf';
  thumbnailPath: string | null;
  imagePath: string | null;
  excelPath: string | null;
  excelPreviewJson?: string | null;
  pdfPath: string | null;
  description: string | null;
  status: string;
  sortOrder: number;
};

export default function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState<PortfolioItem | null>(null);

  if (!items.length) {
    return (
      <div className="empty-box card">
        Portfolio masih kosong. Item akan tampil setelah diupload dari admin panel.
      </div>
    );
  }

  return (
    <>
      <div className="portfolio-grid">
        {items.map((item) => (
          <PortfolioCard
            key={item.id}
            item={item}
            onOpen={() => setActive(item)}
          />
        ))}
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        open={!!active && active.type === 'image'}
        onClose={() => setActive(null)}
        src={active?.imagePath || active?.thumbnailPath || undefined}
        title={active?.title || ''}
      />

      {/* PDF Preview Modal */}
      <PdfPreviewModal
        open={!!active && active.type === 'pdf'}
        onClose={() => setActive(null)}
        title={active?.title || ''}
        pdfUrl={active ? `/api/portfolio/preview/${active.id}` : ''}
        downloadUrl={active ? `/api/portfolio/download/${active.id}` : ''}
      />
    </>
  );
}