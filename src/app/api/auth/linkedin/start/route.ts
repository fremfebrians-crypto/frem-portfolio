import { NextResponse } from 'next/server';
import { createLinkedinAuthUrl } from '@/lib/auth-linkedin';

export async function GET() {
  const url = createLinkedinAuthUrl();
  return NextResponse.redirect(url);
}
