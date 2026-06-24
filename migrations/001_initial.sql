-- Arvixy — Vercel Postgres schema
-- Run this once in your Vercel Postgres dashboard or via `vercel db execute`

-- ─────────────────────────────────────────
-- Tabla content (contenido editable del sitio)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS content (
  id          INTEGER PRIMARY KEY DEFAULT 1,
  data        JSONB NOT NULL DEFAULT '{}',
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Fila inicial (única)
INSERT INTO content (id, data)
VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- Tabla form_submissions (consultas del form)
-- ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS form_submissions (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  company      TEXT,
  project_type TEXT,
  message      TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  read         BOOLEAN DEFAULT FALSE
);

-- ─────────────────────────────────────────
-- Índices para performance
-- ─────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_submissions_read ON form_submissions(read);
CREATE INDEX IF NOT EXISTS idx_submissions_date ON form_submissions(submitted_at DESC);
