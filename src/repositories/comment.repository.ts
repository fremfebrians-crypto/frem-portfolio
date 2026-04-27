import { db } from '@/lib/db';

export const commentRepository = {
  async listPublic() {
    return db.comment.findMany({ where: { status: 'approved' }, orderBy: { createdAt: 'desc' } });
  },
  async listAdmin() {
    return db.comment.findMany({ orderBy: { createdAt: 'desc' } });
  },
  async create(data: Record<string, unknown>) {
    return db.comment.create({ data: data as never });
  },
  async update(id: string, data: Record<string, unknown>) {
    return db.comment.update({ where: { id }, data: data as never });
  },
  async delete(id: string) {
    return db.comment.delete({ where: { id } });
  }
};
