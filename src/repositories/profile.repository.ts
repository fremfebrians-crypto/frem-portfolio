import { db } from '@/lib/db';

export const profileRepository = {
  async get() {
    return db.siteProfile.findFirst();
  },
  async update(data: Record<string, unknown>) {
    const existing = await db.siteProfile.findFirst();
    if (!existing) throw new Error('Site profile not found.');
    return db.siteProfile.update({ where: { id: existing.id }, data });
  }
};
