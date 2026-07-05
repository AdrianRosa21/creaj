---
name: ueds-design-system
description: Use this skill whenever creating or modifying UEDS layouts, pages, components, responsive behavior, animations, colors, typography, icons, empty states or visual content.
---

# UEDS Design System

## Goal

Produce a cohesive, mobile-first agrotech interface that looks premium and custom-built.

## Instructions

1. Read `docs/DESIGN_SYSTEM.md` and `docs/ROUTES_AND_COMPONENTS.md`.
2. Reuse design tokens through CSS variables.
3. Use Sora for headings and Manrope for body/UI through `next/font`.
4. Build accessible components using semantic HTML.
5. Use shadcn/ui only as a structural base; customize it to the UEDS identity.
6. Use Lucide icons consistently.
7. Add useful motion with Motion and support reduced-motion preferences.
8. Validate at 360 px, 390 px, 768 px and 1440 px widths.
9. Prefer cards, sheets and bottom navigation patterns that work naturally on mobile.
10. Keep the initial machine visualization lightweight and 2.5D rather than forcing WebGL.

## Constraints

- No generic emerald SaaS template.
- No giant desktop-only hero.
- No excessive glassmorphism.
- No tiny tap targets.
- No auto-playing heavy video.
- No random gradients unrelated to the palette.
- No placeholder images left in the final demo.

## Quality bar

A finished screen must have intentional spacing, responsive hierarchy, loading states, empty states, errors and polished interaction feedback.
