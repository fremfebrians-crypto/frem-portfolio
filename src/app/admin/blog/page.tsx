import AdminHeader from '@/components/admin/AdminHeader';
import BlogForm from '@/components/admin/BlogForm';
import { blogService } from '@/services/blog.service';

export default async function AdminBlogPage() {
  const items = await blogService.listAdmin();

  return (
    <div>
      <AdminHeader title="Blog Manager" description="Upload HTML articles and publish blog posts." />
      <BlogForm />
      <div className="admin-list-grid">
        {items.map((item) => (
          <div key={item.id} className="card admin-list-item">
            <div>
              <h3>{item.title}</h3>
              <p>{item.slug} . {item.status}</p>
            </div>
            <form action={`/api/blog/${item.id}`} method="post">
              <input type="hidden" name="_method" value="DELETE" />
              <button className="btn btn-secondary" type="submit">Delete</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
