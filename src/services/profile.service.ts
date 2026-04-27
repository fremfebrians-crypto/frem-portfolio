import { profileRepository } from '@/repositories/profile.repository';

export const profileService = {
  async getProfile() {
    return profileRepository.get();
  },
  async updateProfile(data: Record<string, unknown>) {
    return profileRepository.update(data);
  }
};
