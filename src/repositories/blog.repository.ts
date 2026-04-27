import { db } from '@/lib/db';

export const blogRepository = {
  async listPublic() {
    return db.blogPost.findMany({ where: { status: 'published' }, orderBy: [{ publishDate: 'desc' }, { createdAt: 'desc' }] });
  },
  async listAdmin() {
    return db.blogPost.findMany({ orderBy: [{ publishDate: 'desc' }, { createdAt: 'desc' }] });
  },
  async get(id: string) {
    return db.blogPost.findUnique({ where: { id } });
  },
  async getBySlug(slug: string) {
    return db.blogPost.findUnique({ where: { slug } });
  },
  async create(data: Record<string, unknown>) {
    return db.blogPost.create({ data: data as never });
  },
  async update(id: string, data: Record<string, unknown>) {
    return db.blogPost.update({ where: { id }, data: data as never });
  },
  async delete(id: string) {
    return db.blogPost.delete({ where: { id } });
  }
};
