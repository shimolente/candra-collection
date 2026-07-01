import React from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import './styles.css'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { BottomBlur } from '@/components/site/BottomBlur'
import { safeFind, mediaUrl } from '@/lib/data'
import { getSiteUrl } from '@/lib/site'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
})

const siteUrl = getSiteUrl()

const DEFAULT_TITLE = 'Vendor Seragam Bali | Konveksi Uniform Hotel, Villa & Restaurant — Candra Collection'
const DEFAULT_DESC =
  'Candra Collection — vendor seragam & konveksi uniform di Bali untuk hotel, villa, restoran, spa, dan corporate. Custom design, bordir logo, fitting, sampling, dan produksi seragam berkualitas di Denpasar.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESC,
  keywords: [
    'vendor seragam Bali',
    'konveksi seragam Bali',
    'custom uniform Bali',
    'seragam hotel Bali',
    'uniform hotel Bali',
    'konveksi Denpasar',
    'seragam restaurant Bali',
    'seragam spa Bali',
    'hospitality uniform Bali',
  ],
  icons: { icon: '/icon.svg' },
  // NOTE: canonical is set PER PAGE (see each page's metadata). Do not set a
  // shared canonical here — it would make every page canonicalize to one URL.
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: siteUrl,
    siteName: 'Candra Collection',
    locale: 'id_ID',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Candra Collection — Vendor Seragam & Custom Uniform Bali' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ['/og-image.jpg'],
  },
}

type Cat = { id: string; name: string; slug?: string; image?: { url?: string } }

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const categories = await safeFind<Cat>('categories', { sort: 'order' })
  const megaImage = categories.map((c) => mediaUrl(c.image)).find(Boolean) ?? null

  return (
    <html lang="en" className={hanken.variable}>
      <body
        style={
          {
            ['--font-sans' as string]: 'var(--font-hanken)',
            ['--font-serif' as string]: 'var(--font-hanken)',
          } as React.CSSProperties
        }
      >
        <SmoothScroll>
          <Header categories={categories} megaImage={megaImage} />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        {/* Bottom scroll-affordance blur — fades out as the footer comes into view */}
        <BottomBlur />
      </body>
      <GoogleAnalytics gaId="G-0GP7F1SQCQ" />
    </html>
  )
}
