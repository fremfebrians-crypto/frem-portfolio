import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getAdminSession } from '@/lib/auth-admin';

export async function GET() {
  const admin = await getAdminSession();

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let profile = await db.siteProfile.findFirst();

  if (!profile) {
    profile = await db.siteProfile.create({
      data: {
        fullName: 'Frem Pebrianta Tarigan',
        logoText: 'Frem Febrian',
        tagline: 'GENERAL ACCOUNTING',
        heroTitle1: "I'm Frem Pebrianta",
        heroTitle2: 'Tarigan',
        aboutText:
          'I am a General Accounting professional with experience in financial recording, account reconciliation, reporting, and administrative support. I am detail-oriented, disciplined, and committed to maintaining accurate and reliable financial data for daily operations and business decision-making.',
        birthDate: '08 February 2003',
        address: 'Medan, North Sumatra, Indonesia',
        zipCode: '',
        email: 'fremfebrians@gmail.com',
        phone: '085857538258',
        linkedinUrl: 'linkedin.com/in/frem-pebrianta-tarigan-037940278',
        baseLocation: 'Jimbaran, Kuta Selatan, Badung, Bali, Indonesia',
      },
    });
  }

  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  const admin = await getAdminSession();

  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();

  let profile = await db.siteProfile.findFirst();

  if (!profile) {
    profile = await db.siteProfile.create({
      data: {
        fullName: '',
        logoText: '',
        tagline: '',
        heroTitle1: '',
        heroTitle2: '',
        aboutText: '',
        birthDate: '',
        address: '',
        zipCode: '',
        email: '',
        phone: '',
        linkedinUrl: '',
        baseLocation: '',
      },
    });
  }

  // Only update fields that are present in the request body.
  // This prevents file upload requests (which only send cvPath or heroPhotoPath)
  // from wiping out all other profile fields.
  const updateData: Record<string, string> = {};

  const textFields = [
    'fullName', 'logoText', 'tagline', 'heroTitle1', 'heroTitle2',
    'aboutText', 'birthDate', 'address', 'zipCode', 'email',
    'phone', 'linkedinUrl', 'baseLocation',
  ] as const;

  for (const field of textFields) {
    if (field in body) {
      updateData[field] = String(body[field] || '');
    }
  }

  // Handle file path fields (heroPhotoPath, cvPath)
  if ('heroPhotoPath' in body) {
    updateData.heroPhotoPath = String(body.heroPhotoPath || '');
  }

  if ('cvPath' in body) {
    updateData.cvPath = String(body.cvPath || '');
  }

  const updated = await db.siteProfile.update({
    where: { id: profile.id },
    data: updateData,
  });

  return NextResponse.json({ ok: true, profile: updated });
}