# ASVV Ltd Portal Replica

A high-fidelity, clean-room replica of the [ASVV Ltd](https://bbsvltd.com/) digital portal, reverse-engineered and reconstructed following the principles documented in [AIshihzong/awesome-reverse-engineer-anything](https://github.com/AIshihzong/awesome-reverse-engineer-anything.git).

---

## 🔍 Reverse Engineering & Reconstruction Summary

Following the **Reverse Engineer Anything (REA)** methodology, the live web portal at `https://bbsvltd.com/` was analyzed and completely deconstructed into its architectural, functional, and stylistic components:

### 1. Architectural & Routing Graph
The target was analyzed across all route hierarchies and clean URL structures:
* **`/`** — Home page with dynamic canvas animation, interactive service cards, collaboration story, testimonial carousel, and FAQ accordion.
* **`/about`** — Company ethos, core values, working philosophy, and approach.
* **`/services`** — Full service overview catalogue.
* **`/services/custom-software`** — Custom software engineering detail (01 / BUILD).
* **`/services/web-apps`** — Websites & responsive web apps (02 / CREATE).
* **`/services/systems`** — Systems, APIs & database integration (03 / CONNECT).
* **`/services/modernization`** — Legacy software modernization & upgrades (04 / EVOLVE).
* **`/services/testing`** — Functional quality assurance & verification (05 / ASSURE).
* **`/services/support`** — Long-term maintenance & operational support (06 / SUSTAIN).
* **`/contact`** — Lead inquiry form with Formspree endpoint integration and business contact details.

### 2. Frontend & Animation Engine
* **DotLottie & WebAssembly Animation**: The hero section features a canvas rendered by DotLottie WebAssembly player (`dotlottie-player-0.82.1.wasm`) executing the connected systems vector animation (`tech-andre-alves.lottie`).
* **Iconography**: Dynamic runtime vector rendering with Lucide Icons.
* **Typography & Responsive Styling**: System font stack (`Inter`, `ui-sans-serif`, `system-ui`) with CSS custom properties (`--color-surface`, `--color-accent`, `--font-display`), word-reveal animation delays, and viewport-adaptive layouts.
* **Testimonial Carousel**: Multi-card review slider with touch/button navigation controls and star rating indicators.

---

## 🚀 Quick Start

This project is packaged with a zero-dependency, ultra-fast Node.js HTTP server supporting clean URLs and correct MIME types for WebAssembly (`.wasm`), Lottie animations (`.lottie`), WebP graphics, and JavaScript modules.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16 or higher)

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd /Users/venugopal/bbsv-portal
   ```

2. Start the local server:
   ```bash
   npm start
   # Or run: node server.js
   ```

3. Open your browser and visit:
   ```
   http://localhost:4000
   ```

*(Optionally specify a custom port with `PORT=5000 npm start`)*

---

## 📁 Project Structure

```
bbsv-portal/
├── public/
│   ├── index.html                           # Home page
│   ├── about/index.html                     # About us page
│   ├── contact/index.html                   # Contact us page
│   ├── services/
│   │   ├── index.html                       # Services overview
│   │   ├── custom-software/index.html       # 01 / Build
│   │   ├── web-apps/index.html              # 02 / Create
│   │   ├── systems/index.html               # 03 / Connect
│   │   ├── modernization/index.html         # 04 / Evolve
│   │   ├── testing/index.html               # 05 / Assure
│   │   └── support/index.html               # 06 / Sustain
│   ├── _astro/                              # Stylesheets & client scripts
│   │   ├── Footer.Ds6KibVT.css
│   │   ├── site.DiH8E0mQ.js
│   │   └── navigation.BmdBpfkP.js
│   ├── media/                               # Visual assets, branding & animations
│   │   ├── asvv-logo.png
│   │   ├── collaboration-illustration.webp
│   │   ├── service-1.webp ... service-6.webp
│   │   ├── client-preview-1.webp ... 5.webp
│   │   ├── tech-andre-alves.lottie
│   │   └── dotlottie-player-0.82.1.wasm
│   ├── favicon.ico
│   ├── favicon-32x32.png
│   └── apple-touch-icon.png
├── server.js                                # Clean-URL static HTTP server
├── package.json                             # Project metadata and run scripts
├── .gitignore                               # Git ignore definitions
└── README.md                                # Project documentation
```

---

## 🛡️ License & Attribution
* **Original Portal**: [ASVV Ltd](https://bbsvltd.com/)
* **Methodology**: Inspired by the [awesome-reverse-engineer-anything](https://github.com/AIshihzong/awesome-reverse-engineer-anything.git) catalog.
* **Code Rebuild**: MIT License.
