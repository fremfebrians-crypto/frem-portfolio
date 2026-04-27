import BlogGrid from '@/components/blog/BlogGrid';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsapp from '@/components/layout/FloatingWhatsapp';
import { blogService } from '@/services/blog.service';
import { profileService } from '@/services/profile.service';

export default async function BlogListingPage() {
  const [posts, profile] = await Promise.all([blogService.listPublic(), profileService.getProfile()]);

  return (
    <>
      <Header logoText={profile?.logoText || 'Frem Febrian'} />
      <main className="section blog-page">
        <div className="container">
          <div className="section-head center-text">
            <p className="section-breadcrumb">HOME &gt; BLOG</p>
            <h2>Blog Posts</h2>
          </div>
          <BlogGrid posts={posts.map((p) => ({
            ...p,
            publishDate: p.publishDate?.toISOString() ?? null,
          }))} />
        </div>
      </main>
      <Footer profile={profile} />
      <FloatingWhatsapp phone={profile?.phone || '085857538258'} />
    </>
  );
}
