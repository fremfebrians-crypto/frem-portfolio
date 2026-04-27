import AdminHeader from '@/components/admin/AdminHeader';
import PortfolioForm from '@/components/admin/PortfolioForm';

export default function AdminPortfolioNewPage() {
  return (
    <div>
      <AdminHeader title="New Portfolio Item" description="Create a new image or Excel preview item." />
      <PortfolioForm />
    </div>
  );
}
