export const metadata = {
  title: 'Tentang Candra Collection | Konveksi & Vendor Seragam Bali',
  description: 'Candra Collection adalah vendor seragam dan konveksi custom uniform di Bali untuk hotel, villa, restaurant, spa, dan corporate di seluruh Indonesia.',
  alternates: { canonical: '/about' },
}

import Link from 'next/link'
import { Container, SectionHeading } from '@/components/site/primitives'
import { Reveal, RevealGroup, RevealItem } from '@/components/site/Reveal'

export const revalidate = 3600 // ISR: cache 1h, revalidate hourly

const values: [string, string][] = [
  ['Premium Quality', 'Fabrics and stitching held to a consistent, dependable standard.'],
  ['On-Time Delivery', 'Production runs to the schedule we agree on — no surprises.'],
  ['Service Guarantee', 'Any issue with a finished uniform is repaired again, free of charge.'],
]

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="About Us"
              title="Candra Collection"
              intro="A custom uniform specialist based in Bali."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-12 md:grid-cols-2" stagger={0.12}>
            <RevealItem>
              <p className="text-lg text-[var(--color-ink-soft)]">
                Candra Collection was born from a passion for garment-making and the need for a
                uniform partner that delivers consistent production quality with professional
                service. We have helped hotels, villas, restaurants, cafes, and fashion brands
                produce custom uniforms and apparel that reflect their brand identity.
              </p>
            </RevealItem>
            <RevealItem>
              <p className="text-lg text-[var(--color-ink-soft)]">
                We obsess over the detail in every stage of production — fabric selection,
                pattern-making, sampling, and finishing. With an experienced production team, we
                handle both small and large orders to a high standard and on time. To us, a uniform
                is part of a brand&apos;s image and professionalism.
              </p>
            </RevealItem>
          </RevealGroup>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-20 md:py-28">
        <Container>
          <RevealGroup className="grid gap-px bg-[var(--color-line)] md:grid-cols-3" stagger={0.1}>
            {values.map(([t, b]) => (
              <RevealItem key={t} className="bg-[var(--color-paper)] p-10">
                <h3 className="text-2xl font-semibold">{t}</h3>
                <p className="mt-3 text-[var(--color-ink-soft)]">{b}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Bahasa Indonesia — local context for Indonesian clients */}
      <section className="border-t border-[var(--color-line)] py-20 md:py-28" lang="id">
        <Container>
          <div className="grid gap-12 md:grid-cols-2 md:gap-20">
            <Reveal>
              <div>
                <div className="eyebrow">Untuk Klien Indonesia</div>
                <h2 className="mt-5 max-w-xl text-3xl md:text-5xl">
                  Dari Candra Collection, untuk Anda di seluruh Indonesia
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="space-y-5 text-[var(--color-ink-soft)]">
                <p>
                  Candra Collection adalah vendor seragam dan konveksi uniform di Bali yang melayani
                  pembuatan seragam hotel, villa, restaurant, spa, kantor, kitchen, front office,
                  housekeeping, engineering, hingga corporate uniform. Kami menyediakan layanan
                  custom design, pemilihan bahan, pembuatan sampel, bordir logo, fitting ukuran,
                  serta produksi seragam dalam jumlah kecil maupun besar.
                </p>
                <p>
                  Sebagai konveksi seragam di Denpasar, kami melayani area Bali seperti Denpasar,
                  Kuta, Seminyak, Canggu, Ubud, Nusa Dua, Sanur, dan Uluwatu — dengan kualitas
                  jahitan dan bahan yang konsisten untuk kebutuhan hospitality maupun perusahaan.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    'Seragam Hotel Bali',
                    'Seragam Restaurant',
                    'Seragam Spa',
                    'Hospitality Uniform',
                    'Custom Uniform Bali',
                    'Konveksi Denpasar',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-xs font-medium text-[var(--color-ink-soft)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Link
                    href="/contact"
                    className="eyebrow inline-block transition-colors hover:text-[var(--color-ink)]"
                  >
                    Minta Penawaran Seragam &rarr;
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  )
}
