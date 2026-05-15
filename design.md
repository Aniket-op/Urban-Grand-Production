# Urban Grand Production - Design System & Styling Guide

This document outlines the current design system, typography, color palette, and custom utility classes used across the Urban Grand Production web application.

## 1. Typography

The application uses a curated set of premium fonts to establish a corporate, luxurious, and highly readable aesthetic.

*   **Display / Large Headings (`h1`, `h2`, `.font-display`)**
    *   **Font Family:** Playfair Display, serif
    *   **Usage:** Primary page titles, hero section headings.
*   **Secondary Headings (`h3`, `h4`, `.font-heading`)**
    *   **Font Family:** Poppins, Inter, sans-serif
    *   **Usage:** Section headers, card titles.
*   **Body Text (`p`, `.font-body`)**
    *   **Font Family:** Inter, DM Sans, system-ui, sans-serif
    *   **Usage:** General paragraphs, descriptions, and UI element text.
*   **Monospace**
    *   **Font Family:** Geist Mono, monospace
    *   **Usage:** Code snippets, technical data (if applicable).
*   **Eyebrow Text (`.text-eyebrow`)**
    *   **Usage:** Very small, uppercase, heavily tracked text (`tracking-[0.4em]`), often used for sub-labels or categories above main headings.

## 2. Color Palette

A corporate neutral palette with cooler tones, supporting both Light and Dark modes seamlessly.

### Core Variables (HSL format)

| Role | Light Mode | Dark Mode |
| :--- | :--- | :--- |
| **Background** | `210 20% 98%` (Off-white/Cool gray) | `220 20% 6%` (Deep navy/black) |
| **Foreground** | `220 25% 10%` (Near black) | `210 20% 96%` (Off-white) |
| **Primary** | `220 25% 12%` | `210 20% 96%` |
| **Secondary** | `210 12% 93%` | `220 15% 12%` |
| **Muted** | `210 10% 90%` | `220 12% 15%` |
| **Accent** | `220 25% 12%` | `210 20% 96%` |
| **Destructive**| `0 84% 60%` | `0 62.8% 30.6%` |
| **Card** | `210 15% 96%` | `220 18% 8%` |
| **Border** | `220 15% 12% / 0.10` | `210 20% 96% / 0.10` |

### Corporate Brand Accents
Used for specific highlights to convey a premium, trustworthy feel.
*   **Corporate Navy:** `220 35% 18%`
*   **Corporate Gold:** `38 60% 50%`
*   **Corporate Slate:** `215 15% 48%`

## 3. UI Components & Custom Utilities

The design incorporates modern aesthetic patterns like glassmorphism, subtle borders, and dynamic hover shadows.

### Glassmorphism (Frosted Glass)
*   `.glass-light`: Standard blur effect (`blur(20px)`) with semi-transparent background.
*   `.glass-corporate`: Enhanced blur (`blur(24px) saturate(1.2)`) with a subtle box shadow, used for premium corporate card overlays.

### Borders & Dividers
*   `.subtle-border`: Very light border for separating elements without visual clutter.
*   `.subtle-border-strong`: Slightly darker, more defined border.
*   `.section-divider`: A horizontal gradient line (`transparent` to solid to `transparent`) used to cleanly divide major page sections.

### Shadows & Depth (Cardboard Effect)
Used extensively for cards and interactive elements to provide a tactile feel. All shadow utilities have built-in premium hover interactions (lifting and expanding shadows).
*   `.cardboard-shadow-right`: Casts shadow to the bottom-right.
*   `.cardboard-shadow-left`: Casts shadow to the bottom-left.
*   `.cardboard-shadow-flat`: Centered shadow.
*   `.corporate-card`: A structured card component with a subtle border and elegant hover translation.
*   `.glow-accent-shadow`: A subtle golden glow shadow, often used for premium highlighted items.

## 4. Animations & Interactions

Smooth transitions and scroll-based entry animations keep the interface dynamic but professional.

### Keyframe Animations
*   **`fade-in-up` / `.animate-fade-in-up`**: Elements fade in while moving upwards (24px offset).
*   **`fade-in-left` / `.animate-fade-in-left`**: Elements fade in while moving from the left.
*   **`fade-in-right` / `.animate-fade-in-right`**: Elements fade in while moving from the right.
*   **`scroll` / `.animate-scroll`**: Continuous horizontal sliding animation (used for infinite carousels/marquees).
*   **`kenBurns`**: Slow, continuous zoom-in effect (commonly used for hero background images).

### Transition Utilities
*   `.ease-elegant` / `.transition-elegant`: Uses a custom cubic-bezier timing function (`cubic-bezier(0.22, 1, 0.36, 1)`) for extremely smooth, premium-feeling hover states (duration 300ms).

## 5. Standard Layout Practices
*   **Container:** Centered layout containers with `2rem` padding, expanding up to `1400px` max-width (`2xl` breakpoint).
*   **Border Radius:** Global radius variable (`--radius`) applied globally. Scaled down versions for medium/small elements are calculated dynamically.
*   **Snap Sections:** `.snap-section` utility ensures sections take up at least `100vh`, creating full-screen scrolling experiences where necessary.
