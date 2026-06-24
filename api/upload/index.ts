import type { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth
  const cookie = req.headers.cookie ?? null;
    const { getSession } = await import('../_lib/auth.js');
  if (!getSession(cookie)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const chunks: Uint8Array[] = [];
    const reader = req.body as AsyncIterable<Uint8Array>;
    for await (const chunk of reader) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Parse multipart form data manually (simple version)
    const boundary = req.headers['content-type']
      ?.split('boundary=')[1];
    if (!boundary) {
      return res.status(400).json({ error: 'No boundary found' });
    }

    const parts = parseMultipart(buffer, boundary);
    const filePart = parts.find((p) => p.filename);
    if (!filePart) {
      return res.status(400).json({ error: 'No file in request' });
    }

    const filename = `${Date.now()}-${filePart.filename}`;
    const blob = await put(filename, filePart.data, {
      access: 'public',
      contentType: filePart.contentType,
    });

    return res.status(200).json({ url: blob.url });
  } catch (err) {
    console.error('[upload]', err);
    return res.status(500).json({ error: 'Upload failed' });
  }
}

interface Part {
  filename?: string;
  contentType?: string;
  data: Buffer;
}

function parseMultipart(buffer: Buffer, boundary: string): Part[] {
  const parts: Part[] = [];
  const delimiter = Buffer.from(`--${boundary}`);
  const endDelimiter = Buffer.from(`--${boundary}--`);

  let start = 0;
  let idx = buffer.indexOf(delimiter, start);
  while (idx !== -1) {
    const nextIdx = buffer.indexOf(delimiter, idx + delimiter.length);
    if (nextIdx === -1) break;

    const chunk = buffer.slice(idx + delimiter.length + 2, nextIdx - 2); // skip \r\n before next delimiter
    start = nextIdx;
    idx = buffer.indexOf(delimiter, start);

    const headerEnd = chunk.indexOf('\r\n\r\n');
    if (headerEnd === -1) continue;
    const header = chunk.slice(0, headerEnd).toString();
    const body = chunk.slice(headerEnd + 4);

    const disposition = header.match(/Content-Disposition: form-data; name="([^"]+)"; filename="([^"]+)"/i)
      || header.match(/Content-Disposition: form-data; filename="([^"]+)"/i);
    const contentMatch = header.match(/Content-Type: ([^\r\n]+)/i);

    if (disposition) {
      parts.push({
        filename: disposition[disposition.length - 1],
        contentType: contentMatch?.[1] ?? 'application/octet-stream',
        data: body,
      });
    }
  }

  return parts;
}
