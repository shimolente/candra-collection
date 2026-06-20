import React from 'react'
import { Hanken_Grotesk } from 'next/font/google'
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

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Candra Collection — Custom Uniform Specialist, Bali',
  description:
    'Bali-based custom uniform manufacturer for hotels, restaurants, and corporate teams. Uniforms that represent your brand.',
  icons: { icon: '/icon.svg' },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Candra Collection — Custom Uniform Specialist, Bali',
    description:
      'Bali-based custom uniform manufacturer for hotels, restaurants, and corporate teams.',
    url: siteUrl,
    siteName: 'Candra Collection',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Candra Collection — Custom Uniform Specialist, Bali' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Candra Collection — Custom Uniform Specialist, Bali',
    description: 'Bali-based custom uniform manufacturer for hotels, restaurants, and corporate teams.',
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
    </html>
  )
}
