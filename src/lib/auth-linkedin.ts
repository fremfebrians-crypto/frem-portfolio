import crypto from 'crypto';
import { cookies } from 'next/headers';
import { decodeJwt, SignJWT, jwtVerify } from 'jose';
import type { LinkedinUser } from '@/types/comment';

const STATE_COOKIE = 'frem_linkedin_state';
const NONCE_COOKIE = 'frem_linkedin_nonce';
const USER_COOKIE = 'frem_linkedin_user';

function getJwtSecret() {
  return new TextEncoder().encode(process.env.LINKEDIN_JWT_SECRET || 'replace-with-linkedin-secret');
}

export function getAppUrl() {
  return (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function getLinkedinRedirectUri() {
  return `${getAppUrl()}/api/auth/linkedin/callback`;
}

export function createLinkedinAuthUrl() {
  const state = crypto.randomBytes(16).toString('hex');
  const nonce = crypto.randomBytes(16).toString('hex');

  cookies().set(STATE_COOKIE, state, { httpOnly: true, path: '/', sameSite: 'lax' });
  cookies().set(NONCE_COOKIE, nonce, { httpOnly: true, path: '/', sameSite: 'lax' });

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.LINKEDIN_CLIENT_ID || '',
    redirect_uri: getLinkedinRedirectUri(),
    scope: 'openid profile email',
    state,
    nonce
  });

  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export function assertStateAndNonce(state?: string | null, idToken?: string) {
  const savedState = cookies().get(STATE_COOKIE)?.value;
  const savedNonce = cookies().get(NONCE_COOKIE)?.value;
  if (!state || state !== savedState) {
    throw new Error('Invalid LinkedIn state.');
  }
  if (!idToken) throw new Error('Missing LinkedIn ID token.');
  const claims = decodeJwt(idToken);
  if (savedNonce && claims.nonce && claims.nonce !== savedNonce) {
    throw new Error('Invalid LinkedIn nonce.');
  }
  return claims;
}

export async function createLinkedinSession(user: LinkedinUser) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(user.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getJwtSecret());

  cookies().set(USER_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  });

  cookies().delete(STATE_COOKIE);
  cookies().delete(NONCE_COOKIE);
}

export async function getLinkedinSession() {
  const token = cookies().get(USER_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as unknown as LinkedinUser;
  } catch {
    return null;
  }
}

export function clearLinkedinSession() {
  cookies().delete(USER_COOKIE);
  cookies().delete(STATE_COOKIE);
  cookies().delete(NONCE_COOKIE);
}
