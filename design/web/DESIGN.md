---
name: Modern Automation Identity
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#45464d'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0d1c2f'
  on-tertiary-container: '#76859b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered to project **Precision, Intelligence, and Scalability**. It targets a professional B2B audience that values efficiency and technological sophistication. 

The aesthetic is a blend of **Corporate Minimalism** and **Modern Tech**. It prioritizes extreme visual clarity and functional density without feeling cluttered. The interface should evoke an emotional response of "effortless control"—as if the software is thinking two steps ahead of the user. High-end execution is achieved through generous whitespace, razor-sharp typography, and subtle motion that guides the user through complex automated workflows.

## Colors

The palette is anchored by **Deep Navy (#0F172A)**, providing a stable, professional foundation that represents authority and reliability. **Electric Cyan (#06B6D4)** serves as the high-energy "pulse" of the system, used exclusively for primary actions, progress indicators, and data highlights to draw immediate focus to automated wins.

Backgrounds utilize a tiered system of **Light Grays**, starting from a base of #F8FAFC to maintain a "clean-room" laboratory feel. This high-contrast relationship between the deep primary navy and the vibrant cyan creates a sophisticated, high-tech atmosphere typical of top-tier software platforms.

## Typography

This design system utilizes a dual-sans-serif approach to balance character with utility. **Hanken Grotesk** is used for headlines to provide a sharp, contemporary "tech-startup" edge. Its geometry is precise and professional. **Inter** is the workhorse for all UI elements and body text, chosen for its exceptional legibility in data-heavy automation dashboards and tall x-height.

Key typographic rules:
- Use **Negative Letter Spacing** on large headlines to create a tighter, more "designed" look.
- Use **Uppercase Labels** with increased tracking for secondary metadata or small headers within cards.
- Maintain a high contrast ratio between Navy text and Gray backgrounds to ensure accessibility.

## Layout & Spacing

The layout philosophy is built on a **12-column fluid grid** with a maximum container width of 1280px to prevent excessive line lengths on ultra-wide monitors. We employ an **8px base spacing unit** to ensure mathematical consistency across the UI.

- **Desktop:** 24px gutters, 48px page margins.
- **Tablet:** 16px gutters, 24px page margins.
- **Mobile:** 16px gutters, 16px page margins, with content reflowing to a single column.

Automation flows should utilize "Vertical Rhythm," where related components are tightly grouped (8px-12px) and distinct sections are separated by significant air (48px+) to prevent cognitive overload.

## Elevation & Depth

To maintain a minimalist profile, the design system avoids heavy drop shadows. Depth is primarily conveyed through **Tonal Layering** and **Subtle Ambient Shadows**.

1.  **Level 0 (Surface):** The light gray background (#F8FAFC).
2.  **Level 1 (Cards/Containers):** Pure white surfaces (#FFFFFF) with a very soft, high-diffusion shadow (0px 4px 20px rgba(15, 23, 42, 0.05)).
3.  **Level 2 (Modals/Popovers):** Pure white with a more pronounced shadow and a 1px border in a slightly darker gray (#E2E8F0).

For interactive elements, we use a **Cyan-tinted Glow** instead of a shadow to indicate focus or "active" automation states, reinforcing the technological nature of the product.

## Shapes

The shape language is defined as **Refined & Softened**. By using `roundedness: 2`, we achieve an 8px base corner radius. This is the "sweet spot" for professional software—it is more approachable than sharp corners but avoids the "toy-like" feel of overly rounded pill shapes.

- **Standard Elements (Buttons, Inputs, Cards):** 8px (0.5rem).
- **Large Containers (Sections, Main Wrappers):** 16px (1rem).
- **Small Elements (Tags, Tooltips):** 4px (0.25rem).

## Components

### Buttons
- **Primary:** Deep Navy background with White text. Transitions to Electric Cyan on hover.
- **Secondary:** Transparent background with a 1px Navy border.
- **Ghost:** No border, Navy text, subtle gray background on hover.

### Input Fields
Inputs use a white background with a 1px border in #CBD5E1. Upon focus, the border color changes to Electric Cyan with a subtle 2px outer glow of the same color. Labels are always positioned above the field in **Inter Semi-Bold**.

### Cards
Cards are the primary organizational unit. They must have a white background, 8px rounded corners, and a 1px subtle border (#F1F5F9). Padding inside cards should be a consistent 24px (md spacing).

### Automation Nodes / Chips
Specialized components for process visualization. These use a light cyan tint background (#ECFEFF) with Electric Cyan text and borders to distinguish "automated" items from standard UI elements.

### Progress Indicators
Always use Electric Cyan. Use thin, linear bars for a more "tech-forward" and minimalist look compared to thick circular loaders.