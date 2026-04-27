export default function BlogContentRenderer({ html }: { html: string }) {
  return <div className="blog-renderer" dangerouslySetInnerHTML={{ __html: html }} />;
}
