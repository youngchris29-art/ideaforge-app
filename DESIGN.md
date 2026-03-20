# Obsidian Archive

### 1. Overview & Creative North Star
**Creative North Star: The Sovereign Workspace**

Obsidian Archive is a design system crafted for high-stakes business intelligence and the modern "intellectual founder." It rejects the playful, rounded aesthetics of mass-market SaaS in favor of a sophisticated, editorial-inspired atmosphere. By blending the gravity of a premiere broadsheet with the sleekness of high-end dark-mode interfaces, it creates an environment that feels like a private member's club for digital creators. The system uses intentional asymmetry, generous whitespace, and sharp geometric forms to convey precision and prestige.

### 2. Colors
The palette is built upon a foundation of deep, ink-like neutrals and accented with a "Fidelity Gold" that suggests value and illumination.

- **Primary Role:** `#f1c97d` (Primary) serves as a focal point, used for key actions and illustrative accents.
- **The "No-Line" Rule:** Visual separation must be achieved through background shifts (e.g., transitioning from `surface` #131313 to `surface_container_low` #1c1b1b) rather than borders. Visible lines should only be used at 10-20% opacity as "hairline" containers for structural definition.
- **Surface Hierarchy:** Depth is created by "stacking" dark tones. Use `surface_container_lowest` (#0e0e0e) for the most recessed areas (footers/inner containers) and `surface_bright` (#3a3939) for hover states or active card layers.
- **Signature Textures:** Use the "Editorial Gradient" (a linear flow from #f1c97d to #d4ad65) for primary CTAs. This adds tactile quality to an otherwise flat digital surface.

### 3. Typography
Obsidian Archive utilizes a high-contrast pairing between a classic serif and a precision sans-serif.

- **Display & Headlines:** **Newsreader**. This font is the heart of the editorial feel. It should be used with `font-light` (300) or `font-normal` weight to maintain an air of elegance.
- **Body & Labels:** **Plus Jakarta Sans** (Refined from Instrument Sans). A clean, modernist sans-serif that ensures readability in dense intelligence reports.
- **Scale Ground Truth:**
- **Display Large:** 3.75rem (60px) to 6rem (96px) for hero statements.
- **Headlines:** 2.25rem (36px) to 3rem (48px) for section titles.
- **Body:** 1.125rem (18px) for standard reading; 1.25rem (20px) for lead paragraphs.
- **Micro-Labels:** 10px (0.625rem) with 0.3em letter-spacing for uppercase metadata tags.

### 4. Elevation & Depth
Elevation is communicated through **Tonal Layering** and **Atmospheric Shadows**.

- **The Layering Principle:** Rather than Z-axis shadows, depth is suggested by placing lighter containers on darker backgrounds (e.g., a `surface` card on a `surface_container_lowest` background).
- **Ambient Shadows:** Utilize the extracted `shadow-xl` and `shadow-2xl` profiles. Shadows must be extra-diffused, using large blur radii (60px+) and low opacities (40% of black) to simulate a soft light source.
- **Glassmorphism:** Navigation and floating panels use `backdrop-blur-xl` with a 70% opacity background of the surface color to create a "Midnight Glass" effect.

### 5. Components
- **Buttons:** Primary buttons use the Editorial Gradient with sharp (`rounded-md` / 0.25rem) corners. Secondary buttons are semi-transparent with a hairline `outline-variant` border.
- **Cards:** Cards should be "ghosted" with a 10% opacity border and zero-opacity background, transitioning to a solid `surface_bright` on hover.
- **Intelligence Tags:** Small, pill-shaped tags with high letter-spacing and 10px font size, used for categorizing concepts.
- **Progress Indicators:** Use thin, 2px "hairline" bars for data visualization to maintain the precision aesthetic.

### 6. Do's and Don'ts
- **Do:** Use `italic` Newsreader sparingly to emphasize "human" elements of a sentence.
- **Do:** Ensure all capital-case labels have at least 0.2em letter-spacing.
- **Don't:** Use bright white for body text; use `on_surface` (#e5e2e1) to reduce eye strain in dark mode.
- **Don't:** Use rounded corners exceeding 8px (except for tags). The system demands architectural sharp edges.
- **Don't:** Use traditional 1px solid borders for layout separation. Use tone-on-tone shifts.