import { NextResponse } from 'next/server';
import { clearLinkedinSession } from '@/lib/auth-linkedin';

export async function POST(request: Request) {
  clearLinkedinSession();
  return NextResponse.redirect(new URL('/#comments', request.url));
}
