import Link from 'next/link';
import type { BlogPost } from '@/types/blog';
import { formatDate } from '@/lib/utils';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card card">
      {post.thumbnailPath ? <img src={post.thumbnailPath} alt={post.title} className="blog-thumb" /> : <div className="blog-thumb empty" />}
      <div className="blog-copy">
        <p className="section-kicker">{post.publishDate ? formatDate(post.publishDate) : 'Draft'}</p>
        <h3>{post.title}</h3>
        <p>{post.excerpt || 'Uploaded HTML article preview.'}</p>
        <Link className="btn btn-secondary" href={`/blog/${post.slug}`}>Open Post</Link>
      </div>
    </article>
  );
}
