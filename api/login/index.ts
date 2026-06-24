import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createSessionToken, setSessionCookie } from '../../_lib/auth';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body as { password?: string };
  const password = process.env.VERCEL_PASS ?? 'admin';

  if (!body?.password || body.password !== password) {
    return res.status(401).json({ ok: false, error: 'Password incorrecta' });
  }

  const token = createSessionToken();
  setSessionCookie(res, token);

  return res.status(200).json({ ok: true });
}
