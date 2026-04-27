import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWhatsapp from '@/components/layout/FloatingWhatsapp';
import RevealOnScroll from '@/components/layout/RevealOnScroll';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Experiences from '@/components/sections/Experiences';
import Portfolio from '@/components/sections/Portfolio';
import Blog from '@/components/sections/Blog';
import Contact from '@/components/sections/Contact';
import { profileService } from '@/services/profile.service';
import { portfolioService } from '@/services/portfolio.service';
import { blogService } from '@/services/blog.service';
import { commentService } from '@/services/comment.service';

export default async function HomePage() {
  const [profile, portfolioItemsRaw, blogPostsRaw, commentsRaw] = await Promise.all([
    profileService.getProfile(),
    portfolioService.listPublic(),
    blogService.listPublic(),
    commentService.listPublic()
  ]);

  const portfolioItems = portfolioItemsRaw.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  type: item.type as 'image' | 'excel' | 'pdf',
  thumbnailPath: item.thumbnailPath,
  imagePath: item.imagePath,
  excelPath: item.excelPath,
  excelPreviewJson: item.excelPreviewJson,
  pdfPath: item.pdfPath,
  description: item.description,
  status: item.status,
  sortOrder: item.sortOrder,
}));

  const blogPosts = blogPostsRaw.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: item.excerpt,
    thumbnailPath: item.thumbnailPath,
    renderedHtml: item.renderedHtml,
    status: item.status,
    publishDate: item.publishDate?.toISOString() || null
  }));

  const comments = commentsRaw.map((item) => ({
    id: item.id,
    linkedinName: item.linkedinName,
    linkedinEmail: item.linkedinEmail,
    linkedinAvatar: item.linkedinAvatar,
    linkedinTitle: item.linkedinTitle,
    linkedinUrl: item.linkedinUrl,
    message: item.message,
    status: item.status,
    createdAt: item.createdAt.toISOString()
  }));

  return (
    <>
      <Header logoText={profile?.logoText || 'Frem Febrian'} />
      <main>
        <Hero profile={profile} />

        <RevealOnScroll>
          <About profile={profile} comments={comments} />
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <Services />
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <Experiences />
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <Portfolio items={portfolioItems} />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <Blog posts={blogPosts} />
        </RevealOnScroll>

        <RevealOnScroll delay={240}>
          <Contact profile={profile} />
        </RevealOnScroll>
      </main>
      <Footer profile={profile} />
      <FloatingWhatsapp phone={profile?.phone || '085857538258'} />
    </>
  );
}