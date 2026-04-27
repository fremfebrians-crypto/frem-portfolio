import { commentRepository } from '@/repositories/comment.repository';

export const commentService = {
  async listPublic() {
    return commentRepository.listPublic();
  },
  async listAdmin() {
    return commentRepository.listAdmin();
  },
  async create(data: Record<string, unknown>) {
    return commentRepository.create(data);
  },
  async update(id: string, data: Record<string, unknown>) {
    return commentRepository.update(id, data);
  },
  async remove(id: string) {
    return commentRepository.delete(id);
  }
};
