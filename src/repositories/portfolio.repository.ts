import { db } from '@/lib/db';

export const portfolioRepository = {
  async listPublic() {
    return db.portfolioItem.findMany({
      where: {
        status: 'published',
      },
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        title: true,
        category: true,
        type: true,
        thumbnailPath: true,
        imagePath: true,
        excelPath: true,
        excelPreviewJson: true,
        pdfPath: true,
        description: true,
        status: true,
        sortOrder: true,
      },
    });
  },

  async listAdmin() {
    return db.portfolioItem.findMany({
      orderBy: {
        sortOrder: 'asc',
      },
      select: {
        id: true,
        title: true,
        category: true,
        type: true,
        thumbnailPath: true,
        imagePath: true,
        excelPath: true,
        excelPreviewJson: true,
        pdfPath: true,
        description: true,
        status: true,
        sortOrder: true,
      },
    });
  },

  async get(id: string) {
    return db.portfolioItem.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        category: true,
        type: true,
        thumbnailPath: true,
        imagePath: true,
        excelPath: true,
        excelPreviewJson: true,
        pdfPath: true,
        description: true,
        status: true,
        sortOrder: true,
      },
    });
  },

  async create(data: Record<string, unknown>) {
    return db.portfolioItem.create({
      data: data as any,
    });
  },

  async update(id: string, data: Record<string, unknown>) {
    return db.portfolioItem.update({
      where: { id },
      data: data as any,
    });
  },

  async delete(id: string) {
    return db.portfolioItem.delete({
      where: { id },
    });
  },
};