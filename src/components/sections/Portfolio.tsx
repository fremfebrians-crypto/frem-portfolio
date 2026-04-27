import PortfolioGrid from '@/components/portfolio/PortfolioGrid';

type PortfolioItem = {
  id: string;
  title: string;
  category: string | null;
  type: 'image' | 'excel' | 'pdf';
  thumbnailPath: string | null;
  imagePath: string | null;
  excelPath: string | null;
  excelPreviewJson: string | null;
  pdfPath: string | null;
  description: string | null;
  status: string;
  sortOrder: number;
};

export default function Portfolio({ items }: { items: PortfolioItem[] }) {
  return (
    <section id="works" className="section section-alt">
      <div className="container">
        <div className="section-head center-text">
          <div>
            <p className="section-breadcrumb">WORKS</p>
            <h2>Portfolio</h2>
          </div>
        </div>

        <PortfolioGrid items={items} />
      </div>
    </section>
  );
}