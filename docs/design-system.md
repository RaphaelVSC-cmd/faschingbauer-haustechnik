# Design System & Technische Architektur – Faschingbauer
*Heizung • Sanitär • Dämmung • Estrich | Ingolstadt-Gerolfing*
*V3.1 – MotionSites Edition*

---

## 1. Farbpalette & Farbpsychologie

Die Farbpalette reflektiert die 4 Gewerke:
- **Heizung & Thermie:** Strahlendes Kupfer-Orange (`--accent-orange`)
- **Sanitär & Wasser:** Eisblau / Glänzendes Cyan (`--accent-cyan`)
- **Estrich & Dämmung:** Solides Schiefer-Grau / Platinum-Anthrazit (`--card-bg`, `--border`)

### Dark Mode (Default Theme):
```css
:root, [data-theme="dark"] {
  --bg: #060911;
  --bg-gradient: radial-gradient(circle at 50% 0%, #0d1527 0%, #060911 100%);
  --fg: #f8fafc;
  --fg-muted: #94a3b8;
  --card-bg: rgba(12, 18, 32, 0.82);
  --card-bg-hover: rgba(18, 26, 46, 0.95);
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.22);
  
  --accent-cyan: #06b6d4;
  --accent-cyan-light: #67e8f9;
  --accent-cyan-glow: rgba(6, 182, 212, 0.35);
  
  --accent-orange: #f97316;
  --accent-orange-light: #fb923c;
  --accent-orange-glow: rgba(249, 115, 22, 0.35);

  --aurora-1: rgba(6, 182, 212, 0.18);
  --aurora-2: rgba(249, 115, 22, 0.14);
}
```

### Light Mode:
```css
[data-theme="light"] {
  --bg: #f8fafc;
  --bg-gradient: radial-gradient(circle at 50% 0%, #e2e8f0 0%, #f8fafc 100%);
  --fg: #0f172a;
  --fg-muted: #475569;
  --card-bg: rgba(255, 255, 255, 0.92);
  --card-bg-hover: #ffffff;
  --border: rgba(15, 23, 42, 0.08);
  --border-hover: rgba(15, 23, 42, 0.2);

  --accent-cyan: #0284c7;
  --accent-cyan-light: #0369a1;
  --accent-cyan-glow: rgba(2, 132, 199, 0.2);

  --accent-orange: #ea580c;
  --accent-orange-light: #c2410c;
  --accent-orange-glow: rgba(234, 88, 12, 0.2);

  --aurora-1: rgba(2, 132, 199, 0.12);
  --aurora-2: rgba(234, 88, 12, 0.1);
}
```

### Text-Sichtbarkeits- & Kontrast-Regeln (§ 0D):
- Für hervorgehobene Wörter in Titeln (SplitType-sicher):
  ```css
  .gradient-title, .text-accent-cyan {
    color: var(--accent-cyan) !important;
    -webkit-text-fill-color: var(--accent-cyan) !important;
    text-shadow: 0 0 25px var(--accent-cyan-glow);
    display: inline;
  }
  .text-accent-orange {
    color: var(--accent-orange) !important;
    -webkit-text-fill-color: var(--accent-orange) !important;
    text-shadow: 0 0 25px var(--accent-orange-glow);
    display: inline;
  }
  ```

---

## 2. Typografie-System

- **Display-Font (H1, H2, Key Numbers):** `Playfair Display`, serif, italic/bold Accents
- **Body- & UI-Font:** `Plus Jakarta Sans`, sans-serif (300, 400, 500, 600, 700)

```css
h1 { font-family: 'Playfair Display', serif; font-size: clamp(2.25rem, 5.5vw, 4.25rem); line-height: 1.1; letter-spacing: -0.02em; }
h2 { font-family: 'Playfair Display', serif; font-size: clamp(1.85rem, 4vw, 3rem); line-height: 1.15; letter-spacing: -0.015em; }
h3 { font-family: 'Plus Jakarta Sans', sans-serif; font-size: clamp(1.2rem, 2.2vw, 1.6rem); font-weight: 700; line-height: 1.25; }
body { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 1rem; line-height: 1.65; }
```

---

## 3. Animations-Blueprint & Alleinstellungsmerkmale

### Lenis Smooth Scroll Engine (§ 2):
```js
const lenis = new Lenis({
  duration: 0.9,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  syncTouch: false,
  autoResize: true,
});
```

### Implementierte Alleinstellungsmerkmale:
1. **Palomar Sticky Header (§ 19):** Oberer Express-Streifen faltet bei `window.scrollY > 40` ein, Navbar erhält Glassmorphismus.
2. **Kinetic Typography Reveal (§ 6):** SplitType Chars & Lines Stagger Animation auf H1 und Sektionstiteln.
3. **Cinematic Sticky Scroll Stage (§ 14):** 3D Parallax & Depth Layers für die 4 Gewerke.
4. **Scroll-Driven Horizontal Marquee (§ 16):** Gewerke-, Marken- und Orts-Marquee mit GSAP Scrubbing.
5. **3D Tilt-on-Hover Glassmorphismus (§ 0A #8):** Maus-Position erzeugt perspektivischen 3D-Tilt auf Bento-Cards.
6. **Animated Counter Stats (§ 0A #6):** 0 → Endwert bei Einscrollen in den Viewport.
7. **Interaktiver 4-Gewerke Komplett-Rechner (§ 6):** Sofort-Kalkulation von Sanierungsvolumen, Energieersparnis & Richtpreisen.

---

## 4. Double-Bezel & Bento Grid Architektur

Jede Bento- und Inhaltskarte nutzt das Double-Bezel System:
```html
<div class="bento-shell">
  <div class="bento-core">
    <!-- Content -->
  </div>
</div>
```
```css
.bento-shell {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 1.75rem;
  padding: 0.35rem;
  transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}
.bento-core {
  background: var(--card-bg);
  border-radius: calc(1.75rem - 0.35rem);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
  padding: 1.75rem;
  height: 100%;
}
```

---

## 5. Business Features & Legal Setup

- **DSGVO Consent Banner (§ 2):** Blockiert Google Maps iframe (`data-src`), speichert Zustand im `localStorage`.
- **Legal Modals (§ 9):**
  - `#impressumModal` mit echten Daten: Felix Faschingbauer, Eichenwaldstraße 55, 85049 Ingolstadt.
  - `#datenschutzModal` mit Vercel, Formspree, Google Maps, Google Fonts, DSGVO Rechten.
- **WhatsApp Floating Widget (§ 4):** `https://wa.me/491718914790` mit animiertem Pulse-Effekt.
- **Multi-Step Funnel Formular (§ 5):** 3 Schritte mit Fortschrittsbalken, Honeypot-Spamschutz, Validierung und Formspree.
- **Branchenrechner (§ 6):** Dynamischer 4-Gewerke-Schätzer mit Live-Berechnung.
- **Online-Terminbuchung UI-Dummy (§ 11):** Mit Setup-Kommentar für Cal.com / Calendly.
- **Erweitertes Schema.org JSON-LD (§ 8):** `LocalBusiness` / `HVACBusiness` + `OpeningHoursSpecification` + `FAQPage`.

---

## 6. Pre-Delivery Checklist
* [x] Favicon vorhanden (SVG Icon)
* [x] Genau EIN Header (Palomar-Pattern mit einklappbarer Info-Zeile)
* [x] Hamburger: genau EIN X-Mechanismus (Morphing CSS)
* [x] Dark/Light Toggle vorhanden
* [x] Touchpad-Scroll: passive Listener, kein preventDefault
* [x] Alle Texte auf Hintergrund lesbar (SplitType ohne text-fill-color: transparent Bug)
* [x] Mindestens 2 Alleinstellungsmerkmale implementiert (Palomar, Cinematic Parallax, Marquee, 3D Tilt, Counters)
* [x] Lenis + GSAP + SplitType CDN eingebunden
* [x] Kinetic Typography auf H1 + H2
* [x] Staggered Load Animations im Hero
* [x] Bento-Grid asymmetrisch & Wide-Canvas (max-w-7xl)
* [x] Double-Bezel auf allen Karten
* [x] Aurora + Noise im Hero
* [x] Skip-to-Content Link als erstes Element nach `<body>`
* [x] Alle `<img>` mit `alt`, `width`, `height` und Beispielbild-Badge
* [x] FAQ: `aria-expanded` + `aria-controls` + Keyboard-Nav
* [x] DSGVO-Banner + Google Maps Consent
* [x] WhatsApp-Widget mit `491718914790`
* [x] Multi-Step Kontaktformular (3 Schritte + Formspree)
* [x] Branchenrechner implementiert
* [x] Impressum & Datenschutz in responsiven Double-Bezel Modals
* [x] LCP-Bild `fetchpriority="high"`, andere `loading="lazy"`
* [x] 0 halluzinierte Daten
