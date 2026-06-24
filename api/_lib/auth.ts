import { createHmac } from 'crypto';

const SECRET = process.env.SESSION_SECRET ?? 'dev-secret-change-me';
const COOKIE_NAME = 'arvixy-session';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function createSessionToken(): string {
  const payload = `${Date.now()}-${Math.random().toString(36)}`;
  const signature = createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}:${signature}`).toString('base64url');
}

export function verifySessionToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64url').toString();
    const [payload, signature] = decoded.split(':');
    const expected = createHmac('sha256', SECRET).update(payload).digest('hex');
    return signature === expected;
  } catch {
    return false;
  }
}

export function getSessionCookieOptions(maxAge = COOKIE_MAX_AGE) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge,
  };
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k, decodeURIComponent(v.join('='))];
    })
  );
}

export function getSession(cookieHeader: string | null): boolean {
  if (!cookieHeader) return false;
  const cookies = parseCookies(cookieHeader);
  const token = cookies[COOKIE_NAME];
  if (!token) return false;
  return verifySessionToken(token);
}

export function setSessionCookie(res: { headers: Record<string, string> }, token: string) {
  res.headers['Set-Cookie'] = `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`;
}

export function clearSessionCookie(res: { headers: Record<string, string> }) {
  res.headers['Set-Cookie'] = `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`;
}

export function requireAuth(cookieHeader: string | null) {
  if (!getSession(cookieHeader)) {
    throw new Error('Unauthorized');
  }
}
