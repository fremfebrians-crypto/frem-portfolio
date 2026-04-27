export type SiteProfile = {
  id: string;
  fullName: string;
  logoText: string;
  tagline: string;
  heroTitle1: string;
  heroTitle2: string;
  heroPhotoPath?: string | null;
  aboutText: string;
  birthDate: string;
  address: string;
  zipCode?: string | null;
  email: string;
  phone: string;
  linkedinUrl: string;
  baseLocation: string;
  cvPath?: string | null;
};
