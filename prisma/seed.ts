import { db } from '../src/lib/db'
import bcrypt from 'bcryptjs'
import path from 'path'

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'fremfebrians@gmail.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Review123!'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  await db.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: {
      email: adminEmail,
      passwordHash,
    },
  })

  const heroPhotoPath = path.join(process.cwd(), 'storage', 'private', 'hero', 'hero-photo.png')
  const cvPath = path.join(process.cwd(), 'storage', 'private', 'cv', 'Frem_Pebrianta_Tarigan_CV_Revised.pdf')

  const existing = await db.siteProfile.findFirst()

  if (!existing) {
    await db.siteProfile.create({
      data: {
        fullName: 'Frem Pebrianta Tarigan',
        logoText: 'Frem Febrian',
        tagline: 'GENERAL ACCOUNTING',
        heroTitle1: "I'm Frem Pebrianta",
        heroTitle2: 'Tarigan',
        heroPhotoPath,
        aboutText:
          'I am a General Accounting professional with experience in financial recording, account reconciliation, reporting, and administrative support. I am detail-oriented, disciplined, and committed to maintaining accurate and reliable financial data for daily operations and business decision-making.',
        birthDate: '08 February 2003',
        address: 'Medan, North Sumatra, Indonesia',
        zipCode: '',
        email: 'fremfebrians@gmail.com',
        phone: '085857538258',
        linkedinUrl: 'linkedin.com/in/frem-pebrianta-tarigan-037940278',
        baseLocation: 'Jimbaran, Kuta Selatan, Badung, Bali, Indonesia',
        cvPath,
      },
    })
  } else {
    await db.siteProfile.update({
      where: { id: existing.id },
      data: { heroPhotoPath, cvPath },
    })
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
