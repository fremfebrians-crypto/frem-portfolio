import type { BlogPost } from '@/types/blog';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) {
    return <div className="empty-box card">Blog masih kosong. Artikel akan tampil setelah file HTML diupload dari admin panel.</div>;
  }

  return (
    <div className="blog-grid">
      {posts.map((post) => <BlogCard key={post.id} post={post} />)}
    </div>
  );
}
