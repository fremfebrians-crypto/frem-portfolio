import { portfolioRepository } from '@/repositories/portfolio.repository';

export const portfolioService = {
  async listPublic() {
    return portfolioRepository.listPublic();
  },
  async listAdmin() {
    return portfolioRepository.listAdmin();
  },
  async get(id: string) {
    return portfolioRepository.get(id);
  },
  async create(data: Record<string, unknown>) {
    return portfolioRepository.create(data);
  },
  async update(id: string, data: Record<string, unknown>) {
    return portfolioRepository.update(id, data);
  },
  async remove(id: string) {
    return portfolioRepository.delete(id);
  }
};
