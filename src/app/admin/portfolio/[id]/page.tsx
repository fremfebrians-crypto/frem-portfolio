import AdminHeader from '@/components/admin/AdminHeader';
import PortfolioForm from '@/components/admin/PortfolioForm';
import { portfolioService } from '@/services/portfolio.service';

export default async function AdminPortfolioEditPage({ params }: { params: { id: string } }) {
  const item = await portfolioService.get(params.id);

  return (
    <div>
      <AdminHeader title="Edit Portfolio Item" description="Update portfolio content and file previews." />
      <PortfolioForm item={item ? { ...item, type: item.type as 'image' | 'excel' } : undefined} />
    </div>
  );
}
