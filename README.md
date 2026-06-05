# Blitz — Automatiza. Conecta. Crece.

Páginas web con IA para negocios en El Salvador.

## Stack

- **Next.js 15** — App Router
- **React 19** — Server & Client Components
- **TypeScript** — Strict mode
- **Tailwind CSS v4** — Design tokens en CSS
- **GSAP** — Animaciones y ScrollTrigger
- **Lenis** — Smooth scroll
- **Anthropic SDK** — STRIKER chat widget (Claude Haiku)

## Setup

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.local.example .env.local
# Agrega tu ANTHROPIC_API_KEY en .env.local

# 3. Agregar assets en /public/
#    /public/agents/agente-ventas.png
#    /public/agents/agente-secretario.png
#    /public/agents/agente-contenido.png
#    /public/agents/agente-analisis.png
#    /public/agents/super-agente.png
#    /public/logos/striker.png
#    /public/logos/herald.png
#    /public/logos/signal.png
#    /public/logos/oracle.png
#    /public/logos/apex.png
#    /public/hangar.png
#    /public/og-image.png

# 4. Correr en desarrollo
npm run dev
```

## Estructura

```
app/
├── page.tsx              → Home
├── agentes/
│   ├── page.tsx          → /agentes (hangar + operative cards)
│   └── [slug]/page.tsx   → /agentes/striker, /herald, etc.
├── portfolio/page.tsx    → /portfolio
├── contacto/page.tsx     → /contacto
└── api/chat/route.ts     → STRIKER API (Anthropic)

components/
├── layout/
│   ├── Navbar.tsx
│   └── LenisProvider.tsx
├── sections/
│   ├── HeroSection.tsx
│   ├── MarqueeSection.tsx
│   ├── ProblemSection.tsx
│   ├── AgentsPreview.tsx
│   ├── PortfolioPreview.tsx
│   ├── HangarSection.tsx
│   ├── OperativeCards.tsx
│   ├── AgentHero.tsx
│   ├── SharedSections.tsx  → Process, FAQ, CtaFinal, Footer
│   └── PageSections.tsx    → Portfolio, Contact, ROI, Form
└── ui/
    └── StrikerWidget.tsx

lib/
├── agents.ts             → Agent data & types
└── utils.ts              → cn(), formatNumber()
```

## Deploy

Push a GitHub → Vercel auto-deploy. Configura `ANTHROPIC_API_KEY` en las
environment variables de Vercel.
