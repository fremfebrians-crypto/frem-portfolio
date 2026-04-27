import { db } from '@/lib/db';
import AdminPortfolioManager from '../../../components/admin/AdminPortfolioManager';

export default async function AdminPortfolioPage() {
  const items = await db.portfolioItem.findMany({
    orderBy: {
      sortOrder: 'asc',
    },
  });

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <p className="admin-eyebrow">ADMIN</p>
          <h1>Portfolio Manager</h1>
          <p className="admin-subtitle">
            Tambah item portfolio image atau Excel preview dari panel admin.
          </p>
        </div>
      </div>

      <AdminPortfolioManager
        items={items.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category,
          type: item.type as 'image' | 'excel' | 'pdf',
          description: item.description,
          status: item.status,
          sortOrder: item.sortOrder,
          thumbnailPath: item.thumbnailPath,
          imagePath: item.imagePath,
          excelPath: item.excelPath,
          pdfPath: item.pdfPath,
        }))}
      />
    </div>
  );
}