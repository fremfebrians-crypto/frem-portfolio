type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  thumbnailPath: string | null;
  renderedHtml: string | null;
  status: string;
  publishDate: string | null;
};

export default function Blog({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="section">
      <div className="container">
        <div className="section-head center-text">
          <div>
            <p className="section-breadcrumb">BLOG</p>
            <h2>Blog Posts</h2>
          </div>
        </div>

        {!posts.length ? (
          <div className="empty-box card">
            Blog masih kosong. Artikel akan tampil setelah file HTML diupload dari admin panel.
          </div>
        ) : (
          <div className="blog-grid">
            {posts.map((post) => (
              <article key={post.id} className="blog-card card">
                <h3>{post.title}</h3>
                <p>{post.excerpt || 'No excerpt available.'}</p>
                <a className="btn btn-secondary" href={`/blog/${post.slug}`}>
                  Read More
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}