import { Pool } from '@neondatabase/serverless';
import type { VercelPool } from '@neondatabase/serverless';

let pool: VercelPool | null = null;

export function getPool(): VercelPool {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.POSTGRES_URL });
  }
  return pool;
}

export async function query<T = unknown>(
  text: string,
  params?: unknown[]
): Promise<T[]> {
  const client = await getPool().connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}
