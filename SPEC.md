# Arvixy — Backend Spec

## Goal

Agregar un backend mínimo a la web Arvixy para que el usuario pueda editar contenido (logo, fotos, sección soluciones) y ver los mensajes del formulario de contacto, sin tocar código.

---

## Stack

| Capa | Tecnología |
|------|------------|
| Hosting | Vercel (existing HTML + new API + new admin) |
| Base de datos | Vercel Postgres |
| Almacenamiento de imágenes | Vercel Blob |
| API | Vercel Serverless Functions (REST) |
| Admin | HTML + Tailwind vanilla (una sola página) |
| Auth | Password fijo en `VERCEL_PASS` env var + session cookie |

---

## Base de datos (Vercel Postgres)

### Tabla `content`
Almacena el contenido editable del sitio como JSON.

```sql
CREATE TABLE content (
  id INTEGER PRIMARY KEY DEFAULT 1,  -- única fila, siempre id=1
  data JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

`data` contiene:

```json
{
  "logo_url": "https://...",
  "hero_title": "Software que ordena...",
  "hero_subtitle": "...",
  "hero_image_url": "https://...",
  "solutions": [
    {
      "title": "Software de Grado Empresarial",
      "description": "...",
      "icon": "architecture",
      "features": ["Arquitecturas de alta disponibilidad", "Integración nativa de datos"]
    },
    {
      "title": "Consultoría de Transformación",
      "description": "...",
      "icon": "insights",
      "features": []
    }
  ],
  "footer_text": "Elevando los estándares..."
}
```

### Tabla `form_submissions`

```sql
CREATE TABLE form_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT,
  message TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);
```

---

## API (Serverless Functions)

Base path: `/api/`

### GET /api/content
Devuelve el contenido actual del sitio.
- Auth: ninguna (público, para el frontend)
- Response: `{ data: {...}, updated_at: "..." }`

### PUT /api/content
Actualiza contenido editable.
- Auth: `session_cookie`
- Body: `data` (partial JSON, se mergea con lo existente)
- Response: `{ ok: true, data: {...} }`

### POST /api/upload
Sube una imagen a Vercel Blob.
- Auth: `session_cookie`
- Body: `formData` con campo `file`
- Response: `{ url: "https://..." }`

### GET /api/submissions
Lista submissions del formulario.
- Auth: `session_cookie`
- Response: `{ submissions: [...] }`

### POST /api/login
Login del admin.
- Body: `{ password: "..." }`
- Response: `{ ok: true }` + Set-Cookie `session=<token>`
- Error: `{ ok: false, error: "Password incorrecta" }`

### POST /api/logout
- Auth: `session_cookie`
- Response: `{ ok: true }` + Clear-Cookie

---

## Admin Panel (`/admin/`)

### Login (`/admin/login.html`)
- Campo password
- Botón "Ingresar"
- Error inline si falla
- Redirige a `/admin/` si ya está logueado

### Dashboard (`/admin/index.html`)
- Header con logo "Arvixy Admin" + botón logout
- Secciones editables:
  1. **Logo** — preview de la imagen actual + botón "Cambiar logo" (upload)
  2. **Hero** — título, subtítulo (textarea), imagen (upload)
  3. **Soluciones** — listar las 2 cards con campos editables inline (título, descripción, features como lista de texto) + guardarlas
  4. **Footer** — texto descriptivo
- Botón "Guardar cambios" al final de cada sección
- Toast de confirmación al guardar

### Ver Consultas (`/admin/submissions.html`)
- Tabla con columnas: Fecha, Nombre, Email, Empresa, Tipo de proyecto, Mensaje, Leído
- Indicador visual de "no leído" (badge azul)
- Click en fila abre modal con detalle completo
- Marcar como leído al ver

---

## Auth

- Password almacenado en variable de entorno `VERCEL_PASS` (plain text, es para un solo usuario)
- Al hacer login se guarda un token en cookie: `session=arvixy-admin`
- Cookie firmaday validada con `HMAC-SHA256(secret)` donde `secret` = `SESSION_SECRET` env var
- Cookie: `HttpOnly`, `SameSite=Lax`, `Secure` en producción
- Expiración: 7 días

---

## Variables de Entorno Requeridas (Vercel)

```bash
VERCEL_PASS=tu_password_seguro
SESSION_SECRET=random_string_32_chars
POSTGRES_URL=postgres://...
POSTGRES_PRIMARY_URL=...
BLOB_READ_WRITE_TOKEN=...
```

---

## Flujo de deploy

1. `vercel env pull .env.local` — trae variables de Vercel Postgres
2. `vercel deploy` — deploya frontend HTML + functions API + admin

---

## Estructura de archivos

```
arvixy/
├── api/
│   ├── content/
│   │   └── index.ts          GET/PUT /api/content
│   ├── upload/
│   │   └── index.ts          POST /api/upload
│   ├── submissions/
│   │   └── index.ts          GET /api/submissions
│   ├── login/
│   │   └── index.ts          POST /api/login
│   └── logout/
│       └── index.ts           POST /api/logout
├── admin/
│   ├── index.html            Dashboard admin
│   ├── login.html            Login
│   └── submissions.html       Ver consultas
├── code.html                  (existente, el sitio público)
└── SPEC.md
```

---

## Notas de implementación

- El sitio público (`code.html`) NO cambia de estructura — se conecta a `/api/content` al cargar para pintar contenido dinámico. Si la API falla o no hay datos, muestra el fallback hardcodeado.
- Las imagenes se suben a Vercel Blob y se guarda la URL pública en `content.logo_url` o `content.hero_image_url`.
- Admin upload: `fetch('/api/upload', { method: 'POST', body: formData })` → guarda blob → guarda URL en content.
- No se usa Next.js ni ningún framework — puro HTML + Tailwind CDN + vanilla JS en el admin.
