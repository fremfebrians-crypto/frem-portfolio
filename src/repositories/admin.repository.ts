import { db } from '@/lib/db';

export const adminRepository = {
  async getByEmail(email: string) {
    return db.adminUser.findUnique({ where: { email } });
  }
};
