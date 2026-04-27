import AdminHeader from '@/components/admin/AdminHeader';
import BlogForm from '@/components/admin/BlogForm';

export default function AdminBlogNewPage() {
  return (
    <div>
      <AdminHeader title="New Blog Post" description="Upload a new HTML article and publish it when ready." />
      <BlogForm />
    </div>
  );
}
