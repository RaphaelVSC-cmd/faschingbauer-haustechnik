# Übergabe- & Anpassungsanleitung – Faschingbauer Haustechnik
*Heizung • Sanitär • Dämmung • Estrich | Ingolstadt-Gerolfing*
*V3.1 – MotionSites Edition*

---

## 1. Lokale Vorschau starten

### Option A: Windows Schnellstart
Doppelklick auf `start.bat` im Hauptordner des Projekts. Ein lokaler HTTP-Server wird gestartet und die Website öffnet sich automatisch im Standardbrowser.

### Option B: Terminal / Befehlszeile
```bash
# Python HTTP Server
python -m http.server 3000

# oder Node.js live-server
npx serve .
```
Anschließend im Browser `http://localhost:3000` aufrufen.

---

## 2. Anpassungsschritte vor Produktivschaltung

### 1. Formspree Formular-ID eintragen
In `index.html` (Zeile ~465):
```html
<form id="multistepForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
```
Ersetzen Sie `YOUR_FORM_ID` durch die echte Formspree-ID von [formspree.io](https://formspree.io).

### 2. Eigene Kundenfotos austauschen
Ersetzen Sie die generierten Beispielbilder im Ordner `assets/` durch Originalfotos des Betriebs:
- `assets/hero.jpg` (Haupt-Hero-Visual)
- `assets/heizung.jpg` (Heizungs- & Wärmepumpenanlagen)
- `assets/sanitaer.jpg` (Badezimmer & Sanitärinstallationen)
- `assets/daemmung_estrich.jpg` (Estrich- & Dämmarbeiten)
- `assets/felix_faschingbauer.jpg` (Porträt von Inhaber Felix Faschingbauer)

### 3. Impressum ergänzen (USt-IdNr.)
In `index.html` im `#impressumModal`:
Falls vorhanden, die Umsatzsteuer-Identifikationsnummer (z.B. `DE123456789`) eintragen.

### 4. Online-Terminbuchung (Cal.com / Calendly) aktivieren
In `index.html` bei der Sektion `#termin`:
1. Kostenlosen Account auf [cal.com](https://cal.com) oder [calendly.com](https://calendly.com) einrichten.
2. Den Buchungs-Iframe einsetzen:
```html
<iframe src="https://cal.com/felix-faschingbauer/beratung?embed=true" width="100%" height="600" frameborder="0"></iframe>
```

### 5. CRM & Lead-Automatisierung
- **E-Mail Benachrichtigung:** Automatisch über Formspree aktiv.
- **Zapier / Make.com Webhook:** Formspree Pro unterstützt Webhooks, um jede neue Anfrage sofort an HubSpot, Pipedrive oder Google Sheets weiterzuleiten.
- **WhatsApp Benachrichtigung:** Automatisierbar via Make.com WhatsApp Business API.

---

## 3. Vercel Deployment (1-Klick)

1. Repository auf GitHub pushen.
2. Auf [vercel.com](https://vercel.com) anmelden → "Add New Project" → GitHub Repository auswählen.
3. Ohne Build-Konfiguration sofort bereitstellen (statisches HTML/JS).
4. Eigene Domain verknüpfen (z.B. `faschingbauer-haustechnik.de`).
