# Design System: The Editorial Architect

## 1. Overview & Creative North Star
**Creative North Star: "The Intellectual Curator"**

This design system moves beyond the standard "news blog" template to create a high-end, editorial experience that treats complex controversies with the gravitas they deserve. We are building a digital salon—a space that feels authoritative, academic, yet intensely modern. 

The aesthetic strategy breaks from the rigid, boxy layouts of traditional media. We embrace **Intentional Asymmetry** and **Tonal Layering**. By utilizing the Newsreader serif for massive, high-contrast headlines and Public Sans for utilitarian data, we create a rhythmic tension between classic journalism and modern digital interfaces. The goal is "Sophisticated Friction"—where the layout guides the eye through arguments not with lines, but with light, depth, and deliberate whitespace.

---

## 2. Colors & Surface Philosophy
The palette is grounded in deep botanical greens (`primary`), parchment neutrals (`surface`), and scorched earth accents (`secondary`). 

### The "No-Line" Rule
**Explicit Instruction:** 1px solid borders are strictly prohibited for sectioning. Structural boundaries must be defined solely through background color shifts. To separate a main argument from a sidebar, transition the background from `surface` to `surface-container-low`. 

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine heavy-weight paper.
*   **Base Layer:** `surface` (#fcf9f5) – The primary canvas.
*   **Low Contrast Nesting:** Use `surface-container-low` for large content blocks.
*   **High Contrast Importance:** Use `surface-container-highest` for callouts or "The Verdict" sections.
*   **The Depth Stack:** An article card (`surface-container-lowest`) should sit on a background of `surface-container-low` to create a soft, natural lift.

### Glass & Gradient (The "Atmospheric" Rule)
To prevent the UI from feeling "flat," use Glassmorphism for floating navigation and interactive overlays. 
*   **The Glass Token:** Use `surface` at 80% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** For primary CTAs and Hero backgrounds, apply a subtle linear gradient from `primary` (#012827) to `primary_container` (#1b3e3d) at a 135-degree angle. This adds "soul" and dimension that flat hex codes cannot achieve.

---

## 3. Typography
Our typography is a dialogue between the poetic (`newsreader`) and the pragmatic (`publicSans`).

*   **Display & Headlines (Newsreader):** Used for titles and key arguments. The high x-height and elegant serifs convey historical authority. Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) to create a "Signature Editorial" look.
*   **Body & Labels (Public Sans):** Used for the "intellectual labor"—the evidence, the citations, and the UI controls. It is neutral, legible, and modern.
*   **Hierarchy as Identity:** By pairing a `headline-lg` serif with a `label-md` sans-serif (all-caps, tracked out 0.1em), we signal that the content is both a "Story" and a "Systematic Analysis."

---

## 4. Elevation & Depth
In this system, depth is a result of light and shadow, not lines and containers.

*   **Tonal Layering:** Avoid shadows for static elements. Use the `surface-container` tiers to create hierarchy.
*   **Ambient Shadows:** For interactive "elevated" elements (like a focused argument card), use a diffused shadow: 
    *   `Box-shadow: 0 20px 40px rgba(28, 28, 26, 0.06);` 
    *   The shadow color is derived from `on-surface`, never pure black.
*   **The "Ghost Border" Fallback:** If a boundary is strictly required for accessibility, use the `outline-variant` token at **15% opacity**. It should be felt, not seen.
*   **Layering Principle:** High-priority items (like a "Breaking Controversy" alert) should use `surface-container-lowest` (pure white) to appear closest to the user against the off-white `surface`.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `on-primary` text, `md` (0.375rem) corner radius.
*   **Secondary:** `surface-container-highest` fill with `primary` text. No border.
*   **Tertiary:** `publicSans` Label-md, all-caps, with a 2px underline in `secondary_fixed_dim`.

### Cards & Lists
*   **Prohibition:** No divider lines between list items.
*   **Execution:** Separate list items using 16px of vertical white space. Use a `surface-container-low` background on hover to indicate interactivity.
*   **Argument Cards:** Use intentional asymmetry—place the headline (`newsreader`) hanging slightly off the left grid edge for a custom, "Art Direction" feel.

### Input Fields
*   **Styling:** Fill-only. Use `surface-container-high` as the background. 
*   **Focus State:** Transition background to `surface-container-lowest` and add a 2px `primary` bottom-border only.

### Argument Chips
*   **Contextual use:** For tagging "Pro," "Con," or "Neutral."
*   **Style:** Use `secondary_container` with `on_secondary_container` text. Use `full` (9999px) roundedness to contrast against the sharper `md` radius of the main layout.

### Context-Specific: The "Perspective Splitter"
A unique component for this system. A split-screen container using `primary_container` on the left and `secondary_fixed` on the right. This creates a high-contrast visual metaphor for opposing views, forcing the user to acknowledge two sides of a controversy.

---

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a structural element. If a section feels crowded, increase padding rather than adding a line.
*   **DO** use `secondary` (#805439) sparingly for "Human" elements—quotes, testimonials, or author signatures.
*   **DO** mix font weights. A `headline-sm` in Newsreader Medium looks stunning next to a `body-sm` in Public Sans Regular.

### Don't
*   **DON'T** use 100% opaque borders. They break the editorial flow and make the site look like a "web app" rather than a "digital publication."
*   **DON'T** use standard "drop shadows" (e.g., 0 2px 4px). They are too aggressive for this refined palette.
*   **DON'T** center-align long-form body text. Keep it left-aligned for maximum readability and a structured, columnar feel.