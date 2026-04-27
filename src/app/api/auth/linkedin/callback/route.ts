import { NextRequest, NextResponse } from 'next/server';
import { assertStateAndNonce, createLinkedinSession, getLinkedinRedirectUri } from '@/lib/auth-linkedin';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL('/#comments', request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/#comments', request.url));
  }

  const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.LINKEDIN_CLIENT_ID || '',
      client_secret: process.env.LINKEDIN_CLIENT_SECRET || '',
      redirect_uri: getLinkedinRedirectUri()
    })
  });

  const tokenJson = await tokenResponse.json();
  const idToken = tokenJson.id_token as string | undefined;
  const accessToken = tokenJson.access_token as string | undefined;

  if (!idToken || !accessToken) {
    return NextResponse.redirect(new URL('/#comments', request.url));
  }

  const claims = assertStateAndNonce(state, idToken);

  let userInfo: Record<string, string> = {};
  try {
    const userInfoResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    if (userInfoResponse.ok) {
      userInfo = await userInfoResponse.json();
    }
  } catch {
    userInfo = {};
  }

  await createLinkedinSession({
    sub: String(claims.sub || userInfo.sub || ''),
    name: String(claims.name || userInfo.name || [claims.given_name, claims.family_name].filter(Boolean).join(' ') || 'LinkedIn Member'),
    email: String(claims.email || userInfo.email || ''),
    picture: String(claims.picture || userInfo.picture || ''),
    profile: String(userInfo.profile || ''),
    title: String(userInfo.title || userInfo.headline || '')
  });

  return NextResponse.redirect(new URL('/#comments', request.url));
}
