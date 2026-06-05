import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { StrikerWidget } from '@/components/ui/StrikerWidget'
import { LenisProvider } from '@/components/layout/LenisProvider'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Blitz — Automatiza. Conecta. Crece.',
    template: '%s | Blitz',
  },
  description:
    'Páginas web con inteligencia artificial para negocios en El Salvador. 5 agentes IA que trabajan por ti las 24 horas.',
  keywords: ['páginas web El Salvador', 'agente IA', 'automatización negocios', 'Next.js El Salvador'],
  authors: [{ name: 'Blitz', url: 'https://blitz.vercel.app' }],
  openGraph: {
    title: 'Blitz — Automatiza. Conecta. Crece.',
    description: 'Páginas web con IA para negocios en El Salvador.',
    siteName: 'Blitz',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    locale: 'es_SV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blitz — Automatiza. Conecta. Crece.',
    description: 'Páginas web con IA para negocios en El Salvador.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${barlowCondensed.variable} ${barlow.variable}`}>
      <body>
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
          <StrikerWidget />
        </LenisProvider>
      </body>
    </html>
  )
}
