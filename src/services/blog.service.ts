import { blogRepository } from '@/repositories/blog.repository';

export const blogService = {
  async listPublic() {
    return blogRepository.listPublic();
  },
  async listAdmin() {
    return blogRepository.listAdmin();
  },
  async get(id: string) {
    return blogRepository.get(id);
  },
  async getBySlug(slug: string) {
    return blogRepository.getBySlug(slug);
  },
  async create(data: Record<string, unknown>) {
    return blogRepository.create(data);
  },
  async update(id: string, data: Record<string, unknown>) {
    return blogRepository.update(id, data);
  },
  async remove(id: string) {
    return blogRepository.delete(id);
  }
};
