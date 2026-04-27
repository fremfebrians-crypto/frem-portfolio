import { NextResponse } from 'next/server';
import { getLinkedinSession } from '@/lib/auth-linkedin';

export async function GET() {
  const user = await getLinkedinSession();
  return NextResponse.json({ authenticated: Boolean(user), user });
}
