---
name: Lumina Exchange
colors:
  surface: '#111318'
  surface-dim: '#111318'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#e9b3ff'
  on-secondary: '#510074'
  secondary-container: '#7d01b1'
  on-secondary-container: '#e5a9ff'
  tertiary: '#fff3f3'
  on-tertiary: '#67001c'
  tertiary-container: '#ffcdcf'
  on-tertiary-container: '#be003b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#f6d9ff'
  secondary-fixed-dim: '#e9b3ff'
  on-secondary-fixed: '#310048'
  on-secondary-fixed-variant: '#7200a3'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000e'
  on-tertiary-fixed-variant: '#91002b'
  background: '#111318'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is built on the duality of "The Spark" and "The Lab." The landing experience (The Spark) uses a **Cyber-Minimalist** aesthetic, leveraging deep cosmic navys and vibrant neon accents to evoke excitement, innovation, and the high-energy nature of skill acquisition. 

As users transition into the functional EdTech platform (The Lab), the UI shifts to a **Modern-Systematic** style. Here, the neons become precise functional indicators and the layout tightens for maximum clarity and cognitive ease. The overall mood remains friendly and approachable through rounded geometry, but the visual noise is reduced to foster focus and collaboration. This design system bridges the gap between a futuristic "tech-forward" vision and a reliable, accessible educational tool.

## Colors

The palette is anchored in a rich, multi-layered dark mode. 
- **Primary (Electric Cyan):** Used for primary actions, focus states, and representing "Active Learning."
- **Secondary (Vivid Purple):** Used for community-driven features, peer-to-peer connections, and mentorship badges.
- **Accents (Rainbow Gradients):** Specifically reserved for high-impact landing areas, achievement milestones, and the "Skill-Up" progress animations, mimicking the rainbow glow from the reference robot.
- **Functional Contrast:** App screens utilize a slightly lighter background (`#161B22`) than the landing page to define clear boundaries and improve accessibility. Text relies on high-contrast whites and cool grays to ensure legibility against the dark canvas.

## Typography

This design system uses a triple-font strategy to balance tech-forward aesthetics with educational utility. 
- **Sora** handles headlines with its geometric, futuristic personality, making the platform feel cutting-edge. 
- **Hanken Grotesk** is the workhorse for body copy, chosen for its exceptional readability and friendly, modern grotesque letterforms. 
- **JetBrains Mono** is utilized for metadata, tags, and small labels to reinforce the "Skill" and "Logic" aspect of the platform, providing a subtle nod to developer-centric precision.

Scale hierarchy is strictly enforced. For the landing page, "Display" sizes use tighter tracking. For app screens, "Body-md" is the standard for long-form instructional content to ensure optimal reading comfort.

## Layout & Spacing

The layout follows a **Fluid Grid** model. 
- **Desktop:** 12-column grid with 24px gutters. Content is contained within a 1280px max-width container, centered on the screen.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

The spacing rhythm is based on a factor of 8. Large "Section Gaps" (120px) are used on the landing page to create breathing room for neon assets. Inside the app interface, spacing is condensed to 16px-32px gaps to group related controls and information modules tightly, emphasizing the "dashboard" feel. Use generous safe areas around interactive components to ensure touch-targets are accessible.

## Elevation & Depth

This design system avoids traditional heavy shadows in favor of **Tonal Layers** and **Glow Effects**. 
- **The Base:** The deepest layer is the background (`#0D1117`).
- **The Surface:** Cards and containers use a subtly lighter tone (`#161B22`) with a thin, 1px low-opacity border (`rgba(255,255,255,0.1)`).
- **The Spark:** Floating elements or active buttons utilize "Ambient Glows." These are soft, colored drop shadows that match the element's primary or secondary color, simulating a neon tube's light spill on a dark surface.
- **Backdrop Blurs:** Modals and overlays use a 20px blur with a 60% opacity dark fill to maintain context while ensuring the foreground content is legible.

## Shapes

The shape language uses **Rounded (Option 2)** to maintain a friendly, approachable persona within a technical environment.
- Standard components (Buttons, Inputs) use 0.5rem (8px).
- Larger containers (Cards, Modals) use 1rem (16px).
- Visual "Skill Badges" or status chips may use pill-shaped (full-radius) corners to distinguish them from functional UI elements.
- Decorative elements on the landing page may incorporate 45-degree "clipped" corners (reminiscent of the reference image's brackets) to add a technical, sci-fi edge.

## Components

- **Buttons:** Primary buttons are solid Electric Cyan with black text for maximum contrast. Secondary buttons use a "Ghost" style with a cyan border. Landing page CTA buttons feature a subtle rainbow-gradient border.
- **Input Fields:** Dark backgrounds with a 1px gray border. On focus, the border glows Electric Cyan and a subtle 4px blur glow is applied to the perimeter.
- **Chips/Tags:** Monospaced typography (JetBrains Mono) inside pill-shaped containers. Skill levels are color-coded: Beginner (Cyan), Intermediate (Purple), Expert (Rainbow).
- **Cards:** Surface-container style with no shadow. Hovering over a card increases the border opacity and adds a very soft glow at the bottom edge.
- **Progress Bars:** Thin, high-contrast tracks. The "progress" portion is a linear gradient from Cyan to Purple, signaling the "spectrum of learning."
- **Collaboration Indicators:** Avatars of active users have a colored ring around them to indicate their current status (e.g., Purple for "Teaching", Cyan for "Learning").