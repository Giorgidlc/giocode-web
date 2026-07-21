---
version: alpha
name: Giocode Dark
colors:
  primary: "#FFF0EB"
  secondary: "#F40C3F"
  tertiary: "#32FFAB"
  accent: "#FF5C00"
  surface: "#540000"
  background: "#160000"
typography:
  h1:
    fontFamily: HeyWow
    fontSize: 4.75rem
    fontWeight: 600
    lineHeight: 4.375rem
  h2:
    fontFamily: HeyWow
    fontSize: 2.5rem
    fontWeight: 600
    lineHeight: 2.625rem
  h3:
    fontFamily: HeyWow
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.8rem
  body:
    fontFamily: HeyWow
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.4625rem
  label:
    fontFamily: HeyWow
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.1375rem
rounded:
  sm: 11px
  md: 21px
spacing:
  block: 32px
  inline: 16px
  gap: 16px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "12px 16px"
  card:
    rounded: "{rounded.md}"
    padding: "{spacing.block} {spacing.inline}"
  badge:
    rounded: "{rounded.sm}"
    padding: 8px
---

## Overview

Dark, bold, and creative. Giocode es un estudio de soluciones digitales que une diseño y desarrollo. La UI evoca una agencia creativa premium — alto contraste, acentos cálidos y una textura de ruido superpuesta. La interfaz se siente enérgica y profesional, dirigida a agencias y diseñadores que necesitan un partner técnico.

El lenguaje de diseño se construye sobre un fondo carbón oscuro con acentos rosas y verdes vibrantes. Las tarjetas usan colores de fondo audaces (naranja, rosa, marrón) para crear jerarquía visual. La textura de ruido agregada añade una calidad táctil y cruda.

## Colors

La paleta se construye sobre una base de carbón oscuro con acentos cálidos y de alta energía.

- **Primary (#FFF0EB):** Blanco cálido para titulares y texto principal. Más suave que el blanco puro para reducir la fatiga visual.
- **Secondary (#F40C3F):** Rosa vibrante — el acento de marca usado para highlights, spans y acciones secundarias.
- **Tertiary (#32FFAB):** Verde neón — el color principal de CTAs. Usado exclusivamente para botones de acción. Alta visibilidad y energía.
- **Accent (#FF5C00):** Naranja intenso — usado para fondos de tarjetas y acentos visuales.
- **Surface (#540000):** Marrón profundo — usado para fondos de tarjetas y superficies oscuras.
- **Background (#160000):** Casi negro con un subtono rojo cálido. El lienzo de toda la interfaz.

Una textura de ruido (`noise.png`) se aplica a toda la página con `mix-blend-mode: luminosity` y `opacity: 0.1` para añadir una calidad táctil y cruda.

## Typography

La tipografía usa **HeyWow**, una sans-serif geométrica personalizada cargada localmente via `next/font/local`. Se usan dos pesos: Book (400) para texto y SemiBold (600) para titulares.

Todos los tamaños de fuente usan `clamp()` para respuesta fluida — sin breakpoints para tipografía.

- **Headlines (h1):** HeyWow SemiBold, hasta `4.75rem` en desktop. Usado en la sección hero.
- **Section headings (h2):** HeyWow SemiBold, hasta `2.5rem`. Usado para títulos de secciones.
- **Subheadings (h3):** HeyWow SemiBold, hasta `1.5rem`. Usado para títulos de tarjetas y texto de visión.
- **Body text:** HeyWow Book, hasta `1.125rem`. Usado para descripciones y texto de cuerpo.
- **Labels:** HeyWow Book, hasta `1.125rem`. Usado para badges y metadata.

## Layout

El layout usa un sistema de CSS Grid con 16 columnas en mobile y 12 columnas en desktop (≥1024px).

- **Mobile:** `grid-template-columns: repeat(16, 1fr)`
- **Desktop:** `grid-template-columns: repeat(12, 8fr)`
- **Page height:** `min-height: 100dvh` (dynamic viewport height)
- **Horizontal overflow:** Hidden (`overflow-x: hidden`)

Las secciones fluyen verticalmente en este orden: HeaderNav → HeroSection → Services → ValueProposition → Mision → Benefits → Vision → Footer.

La sección Services usa scroll horizontal con `scroll-snap-align: start` en tarjetas y comportamiento de scroll suave.

## Shapes

Los radios de esquina son intencionalmente suaves y redondeados.

- **Cards: 21px** — Redondeo generoso para una sensación amigable y accesible.
- **Buttons & Badges: 11px** — Redondeo moderado para elementos interactivos.

No existen esquinas afiladas en el sistema de diseño.

## Components

### Button (CTA)

Botones principales de acción que enlazan a WhatsApp.

- **Background:** `--color-green` (#32FFAB)
- **Text color:** `--color-dark` (#160000)
- **Border radius:** 11px
- **Padding:** 12px 16px
- **Max width:** 440px
- **Hover:** `scale(1.1)` + `brightness(1.1)`
- **Icon:** `arrow_forward.svg` (16x16) hardcoded
- **Link:** `https://wa.me/+34661963517` (número español)

### Card

Contenedor base para servicios, beneficios y secciones de contenido.

- **Border radius:** 21px
- **Padding:** 32px 16px
- **Min width:** 235px
- **Max width:** 560px (calc 280px × 2)
- **Scroll snap:** `scroll-snap-align: start` (carousel de servicios)

**Themes:**
- `.themeLight` — Background `#FFF0EB`, text `#540000` (brown)
- `.themeOrange` — Background `#FF5C00`, text `#FFF0EB`
- `.themePink` — Background `#F40C3F`, text `#FFF0EB`
- `.themeBrown` — Background `#540000`, text `#FFF0EB`

### Badge

Etiquetas de categoría para servicios.

- **Border radius:** 11px
- **Border:** `solid 1px` `--color-dark`
- **Padding:** 8px
- **Width:** `fit-content`

### ServiceCard

Componente compuesto: Badge + Card (con h3/p) + Button.

Usado en el carousel horizontal de servicios. Requiere `"use client"` para interactividad de scroll.

### BenefitCard

Card con icono SVG + título + descripción.

Usado en la sección Benefits con radio buttons (`name="the-looper"`).

### Icons (SVG)

Componentes SVG personalizados en `components/ui/icons/`:
- `GraphDiamond.tsx`
- `GraphEye.tsx`
- `GraphEyeStart.tsx`
- `GraphOptimize.tsx`
- `GraphSupport.tsx`

## Do's and Don'ts

- Do usar CSS Variables (`--color-*`, `--font-size-*`) para todos los colores y tamaños de fuente
- Do usar CSS Modules (`.module.css`) — nunca inline styles o Tailwind
- Do usar `clamp()` para tipografía responsive — sin sizing de breakpoints para fuentes
- Do usar `color-scheme: dark` para renderizado correcto del navegador
- Do preservar la textura de ruido en `body::before`
- Do usar la fuente HeyWow (Book 400 + SemiBold 600) — nunca sustituir con fuentes del sistema
- Do usar `scroll-snap-align: start` en tarjetas de servicios para comportamiento de carousel
- Do no añadir Tailwind CSS — el proyecto usa CSS Modules exclusivamente
- Do no hardcodear valores de color — siempre usar custom properties de CSS
- Do no remover el pseudo-elemento `::before` de textura de ruido
- Do no usar fuentes del sistema (Arial, Helvetica) como fallback para titulares
- Do no cambiar el formato del link de WhatsApp: `https://wa.me/+34661963517?text=...`
