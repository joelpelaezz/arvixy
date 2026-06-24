import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from '../_lib/db.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, project_type, message } = req.body as {
      name?: string;
      email?: string;
      company?: string;
      project_type?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    await query(
      `INSERT INTO form_submissions (name, email, company, project_type, message)
       VALUES ($1, $2, $3, $4, $5)`,
      [name, email, company ?? null, project_type ?? null, message]
    );

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[submit]', err);
    return res.status(500).json({ error: 'Error al guardar la consulta' });
  }
}
