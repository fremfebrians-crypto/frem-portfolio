import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminSettingsPage() {
  return (
    <div>
      <AdminHeader title="Settings" description="Environment-based settings for LinkedIn and admin access." />
      <div className="card">
        <h3>Configured outside the UI</h3>
        <p>LinkedIn client credentials and admin credentials are loaded from environment variables.</p>
      </div>
    </div>
  );
}
