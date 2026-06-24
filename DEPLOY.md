# Deploy Arvixy en Vercel

## 1. Variables de entorno (Vercel Dashboard)

Ir a **Vercel Dashboard → Settings → Environment Variables** y agregar:

| Variable | Valor |
|---|---|
| `VERCEL_PASS` | Tu password de admin (ej: `miPasswordSeguro2025`) |
| `SESSION_SECRET` | Random string de 32+ chars (ej: `Hd9f2kQ3mNp7xR5tUv8wZ1yB4jL6eA0`) |
| `POSTGRES_URL` | Vercel Postgres connection string (auto-configurado al linking) |
| `POSTGRES_PRIMARY_URL` | Igual que arriba |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token (Settings → Storage → tu bucket → API Token) |

## 2. Migrar la base de datos

Ir a **Vercel Dashboard → Storage → tu Postgres → Query** y ejecutar el contenido de:

```
migrations/001_initial.sql
```

O desde CLI:
```bash
vercel env pull .env.local
vercel db execute --local-path=migrations/001_initial.sql
```

## 3. Linkear el proyecto

```bash
cd arvixy
vercel link
# Elegí el proyecto existente o creá uno nuevo
```

## 4. Deploy

```bash
vercel deploy
```

## 5. Post-deploy

- Admin: `https://tu-dominio.vercel.app/admin/login.html`
- Login con el `VERCEL_PASS` configurado arriba
- Dashboard: `https://tu-dominio.vercel.app/admin/` → editar logo, hero, soluciones, footer
- Consultas: `https://tu-dominio.vercel.app/admin/submissions.html`

## Estructura

```
arvixy/
├── api/
│   ├── _lib/auth.ts     ← utils de sesión
│   ├── _lib/db.ts       ← conexión Postgres
│   ├── content/         GET/PUT contenido editable
│   ├── login/           POST login
│   ├── logout/          POST logout
│   ├── submissions/     GET consultas
│   ├── submit/          POST formulario público
│   └── upload/          POST subir imágenes
├── admin/
│   ├── login.html       ← /admin/login.html
│   ├── index.html      ← /admin/
│   └── submissions.html  ← /admin/submissions.html
├── migrations/
│   └── 001_initial.sql  ← ejecutar en Vercel Postgres
├── design/web/code.html ← sitio público
├── vercel.json
└── package.json
```

## Notas

- El formulario público en `code.html` envía a `/api/submit` automáticamente.
- El sitio carga contenido desde `/api/content` al inicio. Si la API no responde o no hay datos, muestra el contenido fallback hardcodeado.
- Blob está configurado en `access: 'public'` para que las URLs sean accesibles públicamente.
