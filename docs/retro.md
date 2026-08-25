# Retrospektive & Lessons Learned – Faschingbauer Haustechnik
*V3.1 – MotionSites Edition*

---

## 1. Was lief hervorragend?

1. **Strukturelle Einzigartigkeit (4-Gewerke Synergie):**
   - Faschingbauer vereint Heizung, Sanitär, Dämmung und Estrich. Statt einer gewöhnlichen Handwerkerseite wurde die Website als ganzheitlicher "4-in-1 Komplettausbau"-Auftritt mit maßgeschneidertem Rechner, interaktiver Prozess-Stage und Bento-Grid inszeniert.
2. **Palomar-Header mit Collapse-Mechanismus:**
   - Der einklappbare Express-Streifen sorgt für sofortige Sichtbarkeit der Meister-Telefonnummer oben, ohne beim Weiterscrollen wertvollen Viewport-Platz einzunehmen.
3. **Legal Modals System:**
   - Impressum und Datenschutzerklärung liegen als elegante Modals mit Scroll-Containment und ESC-Taste vor, wodurch der Footer clean und aufgeräumt bleibt.
4. **Präzise Recherche:**
   - Inhaber Felix Faschingbauer wurde per Web-Recherche identifiziert und mit echtem Namen in Impressum, Schema.org und dem Verkaufs-Skript eingebunden.

---

## 2. Technische Highlights

- **Lenis + GSAP Synchronisation:** Perfekte Frame-Synchronisation via `gsap.ticker.add` und passiven Event-Listenern für flüssiges Touchpad-Scrolling.
- **SplitType Safe Coloring:** Alle akzentuierten Wörter nutzen direkte HSL-Farben und Glow-Filter anstelle von `-webkit-text-fill-color: transparent`, wodurch unsichtbare Textfragmente ausgeschlossen sind.
- **Rechner-Bundle-Logik:** Dynamische Rabattierung bei Kombination mehrerer Gewerke, um das Auftragsvolumen bei der Lead-Generierung zu maximieren.
