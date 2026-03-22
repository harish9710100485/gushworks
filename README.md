# Mangalam HDPE Pipes — Product Page

> Gushwork Web Developer Assignment — Vanilla HTML, CSS & JavaScript

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-3B4EC8?style=flat)

---

## Overview

A pixel-perfect, fully responsive product detail page for **Mangalam HDPE Pipes**, built with vanilla HTML5, CSS3, and JavaScript — no frameworks or libraries. Implemented directly from Figma design specifications.

---

## Live Preview

Open `index.html` in any modern browser. No build step or server required.

---

## Features

### Sticky Header
- Appears **above** the primary navigation after scrolling past the first fold
- Slides in only when scrolling **down** — disappears on scroll **up**
- Smooth `cubic-bezier` CSS transition; single `position: fixed` element (no duplicate nav bug)

### Image Carousel with Zoom
- 5-slide hero carousel with **prev/next arrows**, clickable thumbnails, and auto-play (4.5s)
- **Zoom on hover** — circular lens tracks cursor; HTML5 Canvas renders a live magnified preview beside the carousel
- Touch swipe and keyboard arrow navigation supported
- Auto-play pauses on hover, resumes on leave

### Auto-Scrolling Testimonials
- Infinite CSS marquee animation — two identical card sets create a seamless loop
- Pauses on hover
- Avatar images easily swappable per card

### Manufacturing Process Tabs
- 8-step pill-tab switcher (Raw Material → Packaging)
- Horizontal scroll on mobile with no page scroll interference

### FAQ Accordion
- Single-open accordion with smooth open/close
- Correct ARIA `aria-expanded` attributes

### Applications Carousel
- Horizontal slide carousel with arrow navigation and touch/swipe support

### Forms
- Catalogue email form with validation feedback
- Contact form with required-field validation and success state

### Responsive Design
| Breakpoint | Layout |
|---|---|
| `> 1024px` | Full desktop — 2-col hero, 3-col grids, 5-col footer |
| `≤ 1024px` | Tablet — stacked hero, 2-col grids, 2-col footer |
| `≤ 768px` | Mobile — hamburger nav, single column, touch carousels |
| `≤ 480px` | Small mobile — compact spacing, stacked actions |
| `≤ 360px` | Extra small — minimal padding, smallest type sizes |

---

## Project Structure

```
├── index.html        # Main HTML — semantic HTML5 throughout
├── styles.css        # All styles — CSS custom properties, Flexbox, Grid
├── script.js         # All interactions — carousel, zoom, tabs, accordion, forms
└── images         # Placeholder image
```

---

## Replacing Images

All image slots are individually labelled in `script.js`. Simply swap each `'img1.jpeg'` string with your actual filenames:

```js
// Hero carousel — 5 slides
const SLIDES = [
  { src: 'pipe-install.jpg',  alt: 'Workers installing HDPE pipes' },
  { src: 'trench-laying.jpg', alt: 'HDPE pipe laying in trench'    },
  // ...
];

// Application carousel — 5 cards
const appSrcs = [
  'fishnet-1.jpg',
  'fishnet-2.jpg',
  // ...
];

// Process panels — 8 tabs (Raw Material, Extrusion, Cooling...)
const ppSrcs = [
  'raw-material.jpg',
  'extrusion.jpg',
  // ...
];

// Portfolio cards — 3 cards
const portSrcs = [
  'fittings.jpg',
  'installation.jpg',
  'pe-rt-pipes.jpg',
];
```

---

## Sections

| # | Section | Description |
|---|---|---|
| 1 | **Hero / Product Detail** | Carousel, certifications, price, CTA buttons |
| 2 | **Trust Bar** | EUROFLEX partner logos |
| 3 | **Technical Specifications** | Dark-background data table + datasheet download |
| 4 | **Built to Last** | 6 feature cards with icons |
| 5 | **FAQ** | 5-item accordion + catalogue email form |
| 6 | **Versatile Applications** | Horizontal image carousel |
| 7 | **Manufacturing Process** | 8-step tab panel with process images |
| 8 | **Testimonials** | Auto-scrolling infinite marquee |
| 9 | **Piping Solutions Portfolio** | 3 product cards + Talk to Expert strip |
| 10 | **Resources & Downloads** | PDF download links |
| 11 | **Contact CTA** | Blue card with embedded contact form |
| 12 | **Footer** | Logo + tagline card, 4-column links, social icons |

---

## Design Tokens (CSS Custom Properties)

```css
--blue:       #3B4EC8   /* Primary buttons, links, accents */
--blue-dark:  #2B3AB0   /* Hover states */
--blue-pale:  #EEF0FF   /* Light tint backgrounds */
--red:        #C0392B   /* Mangalam logo red */
--dark-bg:    #1B2040   /* Tech specs dark section */
--text:       #111827   /* Body text */
--text-mid:   #374151   /* Secondary text */
--text-muted: #6B7280   /* Muted / subtext */
--border:     #E5E7EB   /* All borders */
```

---

## Browser Support

| Browser | Support |
|---|---|
| Chrome 90+ | Full |
| Firefox 88+ | Full |
| Safari 14+ | Full |
| Edge 90+ | Full |
| Mobile Safari iOS 14+ | Full |
| Chrome Android | Full |

---

## Evaluation Criteria Coverage

| Criterion | Implementation |
|---|---|
| Figma accuracy | Pixel-matched colors, spacing, typography, layout |
| Sticky header | position fixed, shows on scroll-down past fold only |
| Image carousel + zoom | Canvas-based lens zoom, thumbnails, auto-play |
| Responsive design | 5 breakpoints from 360px to 1440px+ |
| Code quality | Semantic HTML5, BEM-style classes, commented JS modules |
| Cross-browser | Chrome, Firefox, Safari, Edge |

---

## Author
Harish.P

Built as part of the **Gushwork Web Developer Assignment**.

---

## License

This project is submitted as an assignment. All design rights belong to Mangalam HDPE Pipes / Gushwork.
