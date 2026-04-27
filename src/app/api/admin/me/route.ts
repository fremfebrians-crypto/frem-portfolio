import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth-admin';

export async function GET() {
  const admin = await getAdminSession();

  if (!admin) {
    return NextResponse.json({
      authenticated: false,
      admin: null,
    });
  }

  return NextResponse.json({
    authenticated: true,
    admin,
  });
}