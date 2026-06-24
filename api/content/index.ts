import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../_lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    try {
      const rows = await query<{ data: unknown; updated_at: string }>(
        'SELECT data, updated_at FROM content WHERE id = 1'
      );
      if (rows.length === 0) {
        return res.status(200).json({ data: null, updated_at: null });
      }
      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error('[content GET]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  if (req.method === 'PUT') {
    // Auth via cookie
    const cookie = req.headers.cookie ?? null;
    const { getSession } = await import('../_lib/auth');
    if (!getSession(cookie)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const body = req.body as { data?: unknown };
      if (!body?.data) {
        return res.status(400).json({ error: 'Missing data field' });
      }

      // Upsert
      await query(
        `INSERT INTO content (id, data, updated_at)
         VALUES (1, $1::jsonb, NOW())
         ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
        [JSON.stringify(body.data)]
      );

      const rows = await query<{ data: unknown; updated_at: string }>(
        'SELECT data, updated_at FROM content WHERE id = 1'
      );

      return res.status(200).json({ ok: true, data: rows[0].data, updated_at: rows[0].updated_at });
    } catch (err) {
      console.error('[content PUT]', err);
      return res.status(500).json({ error: 'Database error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
