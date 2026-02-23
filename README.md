# ☕ Arôme Duo – Café & Bistrot

**A premium, production-ready React website for Arôme Duo café, located in Khénifra, Morocco.**

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Run

```bash
# 1. Navigate to the project folder
cd arome-duo

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
# Output goes to /dist — ready to deploy on Vercel, Netlify, etc.
```

---

## 📁 Project Structure

```
arome-duo/
├── index.html              # SEO-optimised HTML entry point
├── vite.config.js          # Vite configuration
├── package.json
└── src/
    ├── main.jsx            # React root renderer
    └── App.jsx             # All components (self-contained)
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Green | `#0f3d2e` |
| Gold Accent | `#c6a75e` |
| Beige Background | `#f5efe4` |
| Heading Font | Playfair Display (serif) |
| Body Font | Cormorant Garamond (serif) |

---

## 📄 Sections

1. **Hero** — Full-screen with animated CTA buttons
2. **About** — Split layout with offset image accent box
3. **Menu** — Tab-filtered cards with hover flip effect
4. **Gallery** — CSS Grid with hover zoom overlay
5. **Testimonials** — Star-rated review cards
6. **Contact** — Info panel + reservation form + map placeholder
7. **Footer** — Logo, links, hours, social icons

---

## ✨ Features

- Sticky transparent navbar that solidifies on scroll
- Scroll-reveal animations (IntersectionObserver)
- Mobile-first fully responsive layout
- Smooth scroll navigation
- Interactive reservation form
- Category-filtered menu system
- Gold & green luxury brand palette
- Google Fonts (Playfair Display + Cormorant Garamond)

---

## 🌐 Deployment

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag & drop /dist folder to netlify.com/drop
```

---

## 📌 To Add Real Content

- **Images**: Replace the emoji placeholders in Gallery and About with `<img>` tags pointing to your photos
- **Google Maps**: Replace the map placeholder in Contact with an actual `<iframe>` embed from Google Maps
- **Phone/Email**: Update the placeholder values in the `CONTACT` section of App.jsx
- **Social Links**: Update the `href="#"` links in Footer and Contact to real Instagram/Facebook URLs

---

*Built with React + Vite · Styled with pure CSS-in-JS · No external UI libraries required*
