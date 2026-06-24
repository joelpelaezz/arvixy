# Arvixy — AGENTS.md

This is a **single-page corporate website** for Arvixy (dev shop + automation consulting). No framework, no build step.

## Quick start

```
open design/web/code.html
```

That's it. Tailwind CSS is loaded via CDN. No bundler, no dev server, no install.

## Project layout

```
arvixy/
├── design/
│   ├── DESIGN.md          # Brand & design system (English)
│   ├── DISENO.md          # Brand & design system (Spanish)
│   ├── prompt-maestro-stitch.md     # Master prompt for Stitch IA
│   ├── prompt-stitch-01-oscura-tecnologica.md
│   ├── prompt-stitch-02-clara-premium-tech.md
│   ├── prompt-stitch-03-futurista-vibrante.md
│   ├── logo/LogoArvixy.png
│   ├── icono/iconoArVixy.png
│   └── web/
│       ├── code.html      # ← PRODUCTION: the website
│       ├── DESIGN.md      # Stitch-generated design tokens
│       └── screen.png     # Reference screenshot
└── AGENTS.md              # ← this file
```

## Source of truth hierarchy

1. `design/DISENO.md` / `design/DESIGN.md` — brand bible, visual rules, palette, typography
2. `design/web/DESIGN.md` — Stitch-specific design tokens (colors, spacing, radii)
3. `design/web/code.html` — actual implementation
4. Stitch prompts in `design/` — used to generate the UI, not to edit it directly

## Design direction

**Hybrid premium-tech**: mostly light background (#F8FAFC) for readability, dark sections (#0F172A) for impact. Accents in blue (#2563EB), cyan (#06B6D4), violet (#7C3AED). Display font: Space Grotesk. Body font: Inter.

## Editing code.html

- Pure HTML + Tailwind utility classes + vanilla JS
- No CSS preprocessor, no JS framework
- `font-display` = Space Grotesk, `font-body` = Inter
- Color classes use custom Tailwind config in `<script>` block (lines ~24-75)
- Animation classes: `.reveal` + `.visible` (IntersectionObserver)
- Mobile menu: JS toggle on `#menuBtn` / `#mobileMenu`
- Contact form: JS handler on `#contactForm`, shows `#formSuccess` on submit
- Navbar shadow toggled on scroll via `#navbar`

## Regenerating with Stitch IA

If you regenerate the UI with Stitch:
1. Pick a prompt from `design/prompt-stitch-*.md`
2. Copy the design rules from `design/DESIGN.md` or `design/DISENO.md`
3. After generation, manually reintegrate any sections Stitch might skip
4. Overwrite `design/web/code.html`

## Conventions

- All text is in **Spanish** (content, labels, placeholders, form)
- Code comments in English
- Classes use Tailwind's naming; custom utilities are prefixed (`glass`, `glow-*`, `bg-grid`, `reveal`, `nav-blur`)
- Brand accent names: `accent` (blue), `cyan`, `violet`
- Surface tier: `surface`, `surface-muted`, `surface-light`, `surface-border`
