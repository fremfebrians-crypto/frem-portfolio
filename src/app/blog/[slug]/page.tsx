import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsapp from '@/components/layout/FloatingWhatsapp';
import BlogContentRenderer from '@/components/blog/BlogContentRenderer';
import { blogService } from '@/services/blog.service';
import { profileService } from '@/services/profile.service';
import { formatDate } from '@/lib/utils';

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const [post, profile] = await Promise.all([
    blogService.getBySlug(params.slug),
    profileService.getProfile()
  ]);

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <>
      <Header logoText={profile?.logoText || 'Frem Febrian'} />
      <main className="section blog-detail-page">
        <div className="container blog-detail-shell card">
          <p className="section-breadcrumb">BLOG POST</p>
          <h1>{post.title}</h1>
          <p className="blog-detail-meta">Published {formatDate(post.publishDate)}</p>
          {post.thumbnailPath ? <img src={post.thumbnailPath} alt={post.title} className="blog-detail-thumb" /> : null}
          <BlogContentRenderer html={post.renderedHtml || '<p>No content available.</p>'} />
        </div>
      </main>
      <Footer profile={profile} />
      <FloatingWhatsapp phone={profile?.phone || '085857538258'} />
    </>
  );
}
