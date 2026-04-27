import AdminHeader from '@/components/admin/AdminHeader';
import BlogForm from '@/components/admin/BlogForm';
import { blogService } from '@/services/blog.service';

export default async function AdminBlogEditPage({ params }: { params: { id: string } }) {
  const item = await blogService.get(params.id);

  return (
    <div>
      <AdminHeader title="Edit Blog Post" description="Update blog metadata and replace the HTML file if needed." />
      <BlogForm item={item ? { ...item, publishDate: item.publishDate?.toISOString() || null } : undefined} />
    </div>
  );
}
