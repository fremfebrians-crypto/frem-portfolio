import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existingProfile = await prisma.siteProfile.findFirst();

  if (existingProfile) {
    console.log('SiteProfile already exists. Skipping seed.');
    return;
  }

  await prisma.siteProfile.create({
    data: {
      fullName: 'Frem Pebrianta Tarigan',
      logoText: 'Frem Portfolio',
      tagline: 'Full Stack Developer',
      heroTitle1: 'Hi, I am Frem Pebrianta Tarigan',
      heroTitle2: 'I build modern web applications.',
      heroPhotoPath: null,
      aboutText:
        'I am a developer focused on building clean, functional, and user-friendly web applications.',
      birthDate: '2003-02-08',
      address: 'Jimbaran, Kec. Kuta Selatan, Kab. Badung, Bali',
      zipCode: 80361,
      email: 'fremfebrians@gmail.com',
      phone: '+6285857538258',
      linkedinUrl: 'linkedin.com/in/frem-pebrianta-tarigan-037940278',
      baseLocation: 'Bali',
      cvPath: null,
    },
  });

  console.log('SiteProfile seeded successfully.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });