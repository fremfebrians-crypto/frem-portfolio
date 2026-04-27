import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminCredentials, createAdminSession } from '@/lib/auth-admin';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || '').trim();
  const password = String(body.password || '').trim();

  const admin = await verifyAdminCredentials(email, password);

  if (!admin) {
    return NextResponse.json(
      { error: 'Email atau password salah' },
      { status: 401 }
    );
  }

  await createAdminSession(email);

  return NextResponse.json({ ok: true });
}