<div align="center">

# ✦ Surya Sekhar Sharma — Portfolio

**A cinematic, scroll-driven developer portfolio built with React + GSAP**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-black?style=for-the-badge&logo=vercel)](https://surya-sekhar-sharma.netlify.app/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=black)](https://tailwindcss.com)

![Portfolio Preview](https://github.com/user-attachments/assets/656e1225-7310-49c9-b124-aa6bd9e3c27d)


</div>

---

## What's Inside

Not your average portfolio. This is a **frame-by-frame canvas animation engine** wrapped around a full developer showcase — every scroll, reveal, and transition is intentional.

```
300 canvas frames  ·  clip-path reveals  ·  3D flip cards
scroll-triggered text  ·  elastic SVG line  ·  custom cursor
sticky parallax cards  ·  cinematic preloader  ·  footer reveal
```

---

## Sections

| Section | Highlight |
|---|---|
| **Hero** | 300-frame canvas scroll animation + clip-path reveal |
| **About** | SVG stroke-to-fill text + scroll-driven gradient fill |
| **What I Do** | Three-panel slide-in with scale collapse |
| **Skills** | Horizontal scroll marquee + stacked sticky cards |
| **Approach** | 3D flip cards with scroll-based gap & rotation |
| **Education** | Clip-path image reveals with per-char stagger |
| **Projects** | Pinned scroll with image wipe transitions |
| **Experience** | Horizontal parallax carousel |
| **Contact/Footer** | Full-section animated reveal with split text |

---

## Tech Stack

**Core**
- [React 18](https://react.dev) + [Vite](https://vitejs.dev)
- [GSAP](https://gsap.com) — SplitText · ScrollTrigger · CustomEase
- [Lenis](https://lenis.darkroom.engineering) — smooth scroll synced with GSAP ticker
- [Tailwind CSS v4](https://tailwindcss.com)
- [Remixicon](https://remixicon.com)

**Animation Techniques**
- `clip-path` polygon transitions for image reveals
- Canvas `drawImage` for frame-by-frame scrubbing
- `SplitText` with mask for char/word stagger
- `ScrollTrigger` pinning with `scrub` for parallax
- `IntersectionObserver` for carousel title transitions
- CSS custom properties driven by GSAP for overlay effects

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/SuryaX2/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start dev server
npm run dev
```

> **Note:** The canvas animation requires 300 JPEG frames in `/public/Frames/` named `frame_0001.jpeg` → `frame_0300.jpeg`. These are not included in the repo due to file size.

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Full-screen animated menu
│   │   ├── HeroFooter.jsx      # Animated hero bottom bar
│   │   ├── CustomCursor.jsx    # GSAP-driven custom cursor
│   │   ├── SvgLine.jsx         # Elastic mouse-follow SVG
│   │   └── Footer/
│   │       └── FooterReveal.jsx # Scroll-triggered footer
│   └── sections/
│       ├── Hero.jsx            # Canvas frame player + preloader
│       ├── About.jsx           # SVG text + gradient fill
│       ├── Skills.jsx          # Marquee + sticky cards
│       ├── FlipCards/          # 3D scroll-driven flip cards
│       ├── Educational-Section/ # Clip-path image scroll
│       ├── ProjectSection/     # Pinned project scroll
│       └── ExpCarousel/        # Horizontal parallax carousel
├── hooks/
│   └── useLenis.js             # Lenis + GSAP ticker setup
├── context/
│   └── LenisContext.js         # Shared scroll instance
└── pages/
    └── Home.jsx
```

---

## Key Animation Patterns

**Frame scrubbing on canvas**
```js
ScrollTrigger.create({
  trigger: heroRef.current,
  start: "top top",
  end: "+=300%",
  scrub: 2,
  onUpdate: (self) => {
    const target = Math.round(self.progress * (FRAME_COUNT - 1));
    drawFrame(target);
  },
});
```

**Clip-path reveal**
```js
tl.to(heroBgRef.current, {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 2,
  ease: "hop",
});
```

**SplitText with mask**
```js
const split = SplitText.create(el, { type: "chars", mask: "chars" });
gsap.from(split.chars, { y: "100%", stagger: 0.05, ease: "power4.out" });
```

---

## Performance Notes

- All frames are preloaded before scroll is unlocked
- `ResizeObserver` keeps canvas dimensions in sync
- `willChange: transform` applied to animated elements
- Lenis scroll is paused during preloader, menu open states
- `ScrollTrigger.refresh()` called after pinned sections are ready

---

## License

MIT — feel free to use this as reference or inspiration. A star ⭐ is appreciated if it helped you!

---

<div align="center">

**Designed & Built by [Surya Sekhar Sharma](https://www.linkedin.com/in/suryax2)**

`React` · `GSAP` · `Lenis` · `Tailwind` · `Vite`

</div>
