export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  thumbnailPath?: string | null;
  renderedHtml?: string | null;
  status: string;
  publishDate?: string | null;
};
