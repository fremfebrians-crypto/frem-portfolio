import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const profileData = {
    fullName: 'Frem Pebrianta Tarigan',
    logoText: 'Frem Portfolio',
    tagline: 'GENERAL ACCOUNTING',
    heroTitle1: 'Frem Pebrianta',
    heroTitle2: 'Tarigan',
    heroPhotoPath: '/images/hero/frem-hero.png',
    aboutText:
      'I am a General Accounting professional with experience in finance, administration, and reporting.',
    birthDate: '2003-02-08',
    address: 'Jimbaran, Kec. Kuta Selatan, Kab. Badung, Bali',
    zipCode: '80361',
    email: 'fremfebrians@gmail.com',
    phone: '+6285857538258',
    linkedinUrl: 'https://www.linkedin.com/in/frem-pebrianta-tarigan-037940278',
    baseLocation: 'Bali',
    cvPath: null,
  };

  const existingProfile = await prisma.siteProfile.findFirst();

  if (existingProfile) {
    await prisma.siteProfile.update({
      where: {
        id: existingProfile.id,
      },
      data: profileData,
    });

    console.log('SiteProfile updated successfully.');
    console.log('Hero photo path:', profileData.heroPhotoPath);
    return;
  }

  await prisma.siteProfile.create({
    data: profileData,
  });

  console.log('SiteProfile created successfully.');
  console.log('Hero photo path:', profileData.heroPhotoPath);
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });