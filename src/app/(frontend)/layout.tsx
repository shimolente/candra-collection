import React from 'react'
import { Hanken_Grotesk } from 'next/font/google'
import './styles.css'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { SmoothScroll } from '@/components/site/SmoothScroll'
import { safeFind, mediaUrl } from '@/lib/data'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-hanken',
  display: 'swap',
})

export const metadata = {
  title: 'Candra Collection — Custom Uniform Specialist, Bali',
  description:
    'Bali-based custom uniform manufacturer for hotels, restaurants, and corporate teams. Uniforms that represent your brand.',
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
        {/* Bottom scroll-affordance blur */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 backdrop-blur-[3px]"
          style={{
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 20%, transparent 100%)',
            maskImage: 'linear-gradient(to top, black 0%, black 20%, transparent 100%)',
          }}
        />
      </body>
    </html>
  )
}
