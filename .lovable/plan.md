
# About Page Redesign

Update `src/pages/About.tsx` with three new sections while keeping the existing hero intro and values grid. Create dedicated components for each new section.

## New Components

### 1. `src/components/site/about/CEOSection.tsx`
- Split layout: left text, right image placeholder (glassmorphism card with gradient border)
- Heading "Meet Our CEO" with gradient text styling
- Body paragraph with the provided content
- Signature-style name block at bottom (stylized line + name + title)
- Framer Motion scroll-reveal entrance (staggered fade-up)

### 2. `src/components/site/about/TeamSection.tsx`
- Section heading "Our Team"
- 3-column grid of team cards (responsive: 1 col mobile, 3 col desktop)
- Each card: avatar placeholder circle, name, role badge, short bio
- Hover effect: card lifts (`-translate-y-2`), border glows with primary color
- Staggered whileInView animations

### 3. `src/components/site/about/WhatWeDoSection.tsx`
- Section heading "What We Do"
- 6 service cards in a 2x3 or 3x2 grid
- Each card: minimal icon (lucide), title, short description
- Hover: icon background fills with primary, subtle scale
- Uses the existing design tokens (border, card, shadow-card, shadow-elevated)

## Page Structure (About.tsx)

1. Existing hero intro (keep as-is)
2. CEO Section (new)
3. Our Team Section (new)
4. What We Do Section (new)
5. Existing Trust section
6. Footer

## Design Approach
- All styling uses existing CSS variables and Tailwind tokens
- Framer Motion for scroll-triggered animations (viewport once)
- Glassmorphism cards use existing `.glass` / `border-gradient` classes
- Typography: Space Grotesk headings, Inter body
- Consistent with the dark navy/gold/white palette already established
