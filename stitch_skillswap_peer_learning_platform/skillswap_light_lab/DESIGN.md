---
name: SkillSwap Light Lab
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
  on-surface-variant: '#3b494b'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#6a7a7b'
  outline-variant: '#b9cacb'
  surface-tint: '#006970'
  primary: '#006970'
  on-primary: '#ffffff'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#00dbe9'
  secondary: '#545f73'
  on-secondary: '#ffffff'
  secondary-container: '#d5e0f8'
  on-secondary-container: '#586377'
  tertiary: '#494bd6'
  on-tertiary: '#ffffff'
  tertiary-container: '#d7d6ff'
  on-tertiary-container: '#494bd7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#d8e3fb'
  secondary-fixed-dim: '#bcc7de'
  on-secondary-fixed: '#111c2d'
  on-secondary-fixed-variant: '#3c475a'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Sora
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
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
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The brand personality for this design system is "Intellectual Futurism." It targets a community of lifelong learners and tech-forward professionals who value clarity, speed, and innovation. The goal is to evoke an emotional response of "clarity and potential"—a digital workspace that feels like a high-end, sun-drenched research laboratory.

The design style is a hybrid of **Minimalism** and **Glassmorphism**, specifically optimized for a light mode environment. It prioritizes heavy whitespace and structural precision (Minimalism) while utilizing translucent layers and subtle backdrop blurs (Glassmorphism) to maintain a sense of depth and technical sophistication. This approach ensures the UI remains professional and airy without losing the distinctive "tech edge" of the brand.

## Colors

The palette is anchored by the signature Cyan, adapted for a light background. To ensure accessibility, the primary cyan (#00f0ff) is used predominantly for decorative accents, active states, and high-impact visual indicators, while a deepened version or high-contrast secondary color handles critical information.

- **Primary:** #00f0ff (Cyan) - Used for brand flair, progress bars, and focus states.
- **Secondary:** #1E293B (Deep Navy) - Used for primary text and core structural elements to ensure WCAG AAA readability.
- **Surface Primary:** #FFFFFF - Pure white for the highest level of information (cards, modals).
- **Surface Secondary:** #F8FAFC - Very light gray for the main application background.
- **Surface Tertiary:** #F1F5F9 - Used for input fields and subtle section grouping.
- **Accents:** Use a subtle indigo (#6366F1) as a tertiary color for secondary actions to provide a professional counterpoint to the vibrant cyan.

## Typography

The typography utilizes **Sora** across all levels to reinforce the geometric, futuristic identity. The scale is designed for high legibility in an educational context, with generous line heights to prevent visual fatigue.

Headlines use a bold weight with slightly tighter letter-spacing to create a strong visual "anchor" on the page. Body text is kept at a medium weight or regular weight to ensure the geometric nature of the font doesn't become distracting during long reading sessions. Labels use a semi-bold weight and all-caps styling for small-scale categorization.

## Layout & Spacing

This design system employs a **Fluid Grid** system with a strict 8px spatial rhythm. The layout is designed to feel open and expansive, prioritizing "breathing room" around core content areas.

- **Desktop (1440px+):** 12-column grid, 40px margins, 24px gutters.
- **Tablet (768px - 1439px):** 8-column grid, 24px margins, 20px gutters.
- **Mobile (Under 768px):** 4-column grid, 16px margins, 16px gutters.

Horizontal alignment should follow the 8px increments. Vertical rhythm is driven by the 4px/8px baseline to ensure that text and icons align perfectly within components.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Soft Shadows**. Rather than heavy glows, depth is communicated through the physical properties of light passing through glass.

1.  **Low Elevation (Level 1):** Subtle 1px borders in #E2E8F0. No shadow. Used for secondary cards and static layout sections.
2.  **Mid Elevation (Level 2):** A soft, diffused shadow (0px 4px 20px rgba(30, 41, 59, 0.05)). Used for interactive cards and primary navigation bars.
3.  **High Elevation (Level 3):** Glassmorphic effect with a 12px backdrop blur and 60% opacity white fill. Shadow is more pronounced (0px 12px 32px rgba(30, 41, 59, 0.1)). Used for modals, dropdowns, and floating action buttons.

Avoid using black shadows; always tint shadows with the secondary Navy (#1E293B) to maintain a clean, laboratory aesthetic.

## Shapes

The design system uses a **Rounded** shape language (8px base) to strike a balance between friendly approachability and modern precision. 

- **Standard Components:** 8px (0.5rem) radius for buttons, input fields, and small cards.
- **Large Containers:** 16px (1rem) radius for main content sections and large feature cards.
- **Full Round:** Used exclusively for tags, avatars, and search bars to provide visual variety and a "pill" aesthetic where appropriate.

## Components

### Buttons
Primary buttons use a solid Cyan (#00f0ff) background with Deep Navy (#1E293B) text for maximum contrast. Secondary buttons use a transparent background with a 1.5px Deep Navy border. Hover states should introduce a subtle "lift" using Level 2 elevation.

### Input Fields
Fields use the Surface Tertiary (#F1F5F9) background with a subtle 1px border. On focus, the border transitions to Primary Cyan with a soft cyan outer glow (4px spread, 20% opacity) to signify the "active lab" state.

### Cards
Cards are the primary container. They should use Surface Primary (#FFFFFF) with a Level 1 border. Feature cards can utilize the Glassmorphic styling (backdrop blur) when placed over subtle gradient backgrounds.

### Chips & Tags
Used for skills and categories. These should be pill-shaped with a light Cyan tint (#E0FAFF) and Deep Navy text. This maintains the "tech" feel while ensuring readability.

### Lists
List items are separated by subtle #F1F5F9 dividers. Selection states are indicated by a 4px vertical Cyan bar on the left edge of the list item, rather than a full background color change, to keep the UI airy.