# Project Nova — Development Rules & Specifications

> **Project Overview**: **Nova** is a premier, high-craft editorial blog and digital publication platform covering technology, culture, design, and future ideas. It blends magazine-level editorial design with modern web interactions.

---

## 1. Core Principles & Design Philosophy

- **Zero "AI Slop" & Non-Generic Aesthetic**:
  - Avoid cookie-cutter SaaS layouts, oversized generic gradient blobs, and bland card grids.
  - Implement a **Neo-Editorial & Cyber-Minimalist** aesthetic: intentional asymmetry, high-contrast editorial typography, refined borders, subtle noise/mesh textures, and polished micro-interactions.
  - Every component must feel bespoke, crafted, and purpose-built for high-readership engagement.
- **Micro-Interactions & Fluid Motion**:
  - Subtle hover states, smooth page/tab transitions, reading progress bar, floating action buttons, and responsive feedback on every click.
- **Responsive & Mobile-First**:
  - Flawless rendering from 320px mobile screens up to 4K desktop displays.
- **Accessibility & SEO**:
  - Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
  - Single descriptive `<h1>` per view, proper heading hierarchy, ARIA attributes, and keyboard navigability.

---

## 2. Curated Color Palette & Design System

### Theme: *Editorial Obsidian & Luminous Amber*

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--bg-primary` | `#0B0D11` | Deep obsidian background |
| `--bg-secondary` | `#13171F` | Elevated surface / card background |
| `--bg-tertiary` | `#1B212D` | Hover states, inputs, dropdowns |
| `--border-subtle` | `rgba(255, 255, 255, 0.08)` | Clean structural borders |
| `--border-focus` | `rgba(245, 158, 11, 0.4)` | Focused interactive outlines |
| `--accent-primary` | `#F59E0B` | Luminous amber / editorial gold |
| `--accent-hover` | `#D97706` | Deep amber hover state |
| `--accent-secondary` | `#6366F1` | Electric indigo for tech tags & badges |
| `--text-primary` | `#F8FAFC` | Crisp ivory for headlines and primary copy |
| `--text-secondary` | `#94A3B8` | Muted slate for excerpts and metadata |
| `--text-muted` | `#64748B` | Subtle captions, timestamps, read-time |
| `--accent-glow` | `rgba(245, 158, 11, 0.15)`| Ambient backlight & hero accents |

### Typography
- **Headings & Accents**: `'Space Grotesk'` or `'Cabinet Grotesk'` (editorial, modern, structured)
- **Body & Reading**: `'Inter'` or `'Plus Jakarta Sans'` (ultra-legible, crisp readability at all scales)
- **Editorial Quotes / Serif Accents**: `'Playfair Display'` or `'Newsreader'` (used tastefully for drop-quotes and pullouts)

---

## 3. Technology Stack & Dependencies

- **Structure**: Semantic **HTML5**
- **Styling**: **Vanilla CSS3**
  - Modern CSS Variables (`:root` tokens for theme, spacing, radii)
  - CSS Grid & Flexbox layouts
  - Native CSS animations & smooth transitions
  - Strict rule: **No Tailwind or external bloated CSS frameworks**
- **Logic**: **Vanilla Modern JavaScript (ES6+)**
  - Modular scripts for router/navigation, article data, interactions, and payment mock
  - LocalStorage integration for bookmarks, read history, and user preferences
  - Zero heavy external JS library dependencies (lightweight, blazing fast)
- **Assets**: SVG icons (Heroicons/Lucide inspired) and curated high-resolution editorial imagery in `media/`

---

## 4. Folder Structure & Organization

```
viber coder/
├── index.html            # Main SPA/multi-page shell & entry point
├── RULE.md               # Project development rules & design guidelines
├── media/                # High-res article hero images, avatars, icons, badges
├── styles/
│   ├── variables.css     # Design tokens, color system, typography variables
│   ├── base.css          # Reset, global defaults, typography, utilities
│   ├── components.css    # Cards, buttons, modals, badges, navigation, forms
│   └── pages.css         # Page-specific layouts (home, blogs, about, contact, payment)
└── scripts/
    ├── data.js           # Rich mock data (articles, authors, categories, pricing plans)
    ├── router.js         # Seamless view navigation & state management
    ├── main.js           # Core event listeners, mobile menu, search & filters
    └── payment.js        # Interactive checkout flow, billing toggles, modal logic
```

---

## 5. Page Specifications & Features

### 1. Home Page (`#home`)
- **Top Bar / Navigation**: Brand logo ("NOVA"), navigation links, category drop, search trigger, bookmark drawer toggle, and "Subscribe" CTA.
- **Hero Feature**: Magazine-grade split hero with primary spotlight story, live category badges, author avatar, reading time, and animated "Read Story" CTA.
- **Trending Ticker / Marquee**: Real-time trending headlines, views counter, and hot topics.
- **Curated Feeds**:
  - Editors’ Choice grid with asymmetric layout
  - Quick-read micro-articles (3-min reads)
  - Trending topics filter bar (Tech, Future, Culture, Design, AI)
- **Newsletter Subscription Card**: Sleek inline capture form with instant success feedback.

### 2. Blogs Page (`#blogs`)
- **Search & Live Filter Bar**: Real-time keyword search, category filter chips, and sorting (Latest, Most Popular, Long Reads).
- **Article Grid & Editorial List View**: Toggle between a dense magazine grid and an expansive editorial list.
- **Article Reader Modal / Deep-Dive View**:
  - Clean reading mode with progress bar on scroll.
  - Floating toolbar: Save/Bookmark, Share, Font-size adjustment, Like counter.
  - Author bio card with follow toggle.
  - "Related Articles" recommendation drawer at the bottom.

### 3. About Page (`#about`)
- **Manifesto & Mission**: Bold typographic declaration of Nova's editorial philosophy.
- **Interactive Stats Counter**: Articles published, global readers, curated topics, community members.
- **Editorial Board & Writers Grid**: Interactive author cards with bio, topics, and social links.
- **Timeline / Milestones**: Journey of Nova from underground newsletter to premier publication.

### 4. Contact Page (`#contact`)
- **Interactive Contact Form**: Floating label inputs, subject selector, character counter, and instant validation with toast notifications.
- **Editorial Touchpoints**: Direct editorial pitches, press inquiries, and advertising contact blocks.
- **Interactive FAQ Accordion**: Expandable answers to common reader and contributor questions.

### 5. Payment & Membership Page (`#payment`)
- **Tier Selector & Billing Toggle**: Monthly vs. Annual toggle with discount highlight badge (Save 20%).
- **Tier Comparison Cards**:
  - *Free Reader* (Standard access, public articles)
  - *Nova Pro* (Full deep-dives, audio versions, member-only discussions, ad-free) — *Most Popular*
  - *Patron / Lifetime* (Direct editorial access, VIP briefings, founder badge)
- **Feature Matrix**: Visual checklist comparing tier privileges.
- **Checkout Modal**:
  - Interactive payment form with payment method switcher (Credit Card, Apple/Google Pay, Crypto).
  - Live card preview, coupon discount applicator, and mock order confirmation toast with simulated receipt.

---

## 6. Quality & Execution Rules

1. **No Broken Links or Dead Ends**: Every button, navigation item, and modal must have a functioning event or fallback state.
2. **Persistent State**: Bookmarked articles and subscription mock state must persist across reloads via `localStorage`.
3. **Smooth Transitions**: Modals, drawers, and page changes must use smooth CSS transitions with no jarring jumps.
4. **Clean Codebase**: Maintain modular, well-commented CSS and JavaScript files matching the defined folder structure.
5. **Fast Load & Performance**: Optimized asset sizes, responsive images, and zero render-blocking unnecessary scripts.