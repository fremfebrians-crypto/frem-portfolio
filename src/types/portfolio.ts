export type PortfolioItem = {
  id: string;
  title: string;
  category?: string | null;
  type: 'image' | 'excel';
  thumbnailPath?: string | null;
  imagePath?: string | null;
  excelPath?: string | null;
  excelPreviewJson?: string | null;
  description?: string | null;
  status: string;
  sortOrder: number;
};
