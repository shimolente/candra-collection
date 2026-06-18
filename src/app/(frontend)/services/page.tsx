import Link from 'next/link'
import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Container, SectionHeading } from '@/components/site/primitives'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/site/Reveal'
import { safeFind, mediaUrl } from '@/lib/data'

export const dynamic = 'force-dynamic'

type Media = { url?: string; alt?: string }
type Service = {
  id: string
  title: string
  summary?: string
  description?: SerializedEditorState
  image?: Media
  highlights?: string[]
}

const fallback: Service[] = [
  {
    id: '1',
    title: 'Consultation',
    summary:
      'We start by understanding your brand identity, dress code requirements, and quantity needs.',
    highlights: [
      'Brand & dress-code discovery session',
      'Fabric and budget guidance',
      'Quantity and timeline planning',
    ],
  },
  {
    id: '2',
    title: 'Master Fitting',
    summary:
      'Sample garments are produced and refined until every fit, fabric, and finish meets your standard.',
    highlights: [
      'Physical sample garments',
      'Fit, fabric & finish refinement',
      'Sign-off before the bulk run',
    ],
  },
  {
    id: '3',
    title: 'Custom Design',
    summary:
      'Our team works with your brief — or builds from scratch — to create a uniform that reflects your brand.',
    highlights: [
      'Logo placement & embroidery',
      'Color matching to brand guidelines',
      'Original design from scratch',
    ],
  },
  {
    id: '4',
    title: 'Bulk Production',
    summary:
      'Consistent quality, accurate quantities, and on-schedule delivery — ready for your team when you need them.',
    highlights: [
      'Quality-controlled production line',
      'Accurate quantities & sizing runs',
      'On-time delivery across Indonesia',
    ],
  },
]

// The full client journey — from first conversation to delivery.
const steps: [string, string][] = [
  ['Consultation & Design', 'We discuss your needs, design direction, and the fabrics that fit your brand.'],
  ['Quotation', 'We send a clear quote tailored to your requirements and quantities.'],
  ['50% Down Payment', 'An initial payment confirms the order and starts the sampling stage.'],
  ['Measurement', 'Sizes are captured via size chart or an on-site fitting with your team.'],
  ['Sampling & Approval', 'We produce and refine samples until you approve, before full production.'],
  ['Production & Finishing', 'Your order is produced and finished — roughly 1–1.5 months for large runs.'],
]

export default async function ServicesPage() {
  const services = await safeFind<Service>('services', { sort: 'order' })
  const items = services.length ? services : fallback

  return (
    <>
      {/* Intro */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="End-to-End Uniform Solutions"
              intro="From the first conversation to the final delivery, we handle every step of creating uniforms that represent your brand — consultation, design, fitting, and production under one roof."
            />
          </Reveal>
        </Container>
      </section>

      {/* Detailed services — alternating image + text */}
      <section className="border-t border-[var(--color-line)]">
        <Container>
          <div className="flex flex-col">
            {items.map((s, i) => {
              const img = mediaUrl(s.image)
              const left = i % 2 === 0
              return (
                <Reveal key={s.id}>
                  <div className="grid items-center gap-10 border-b border-[var(--color-line)] py-16 md:grid-cols-2 md:gap-16 md:py-24">
                    {/* Text */}
                    <div className={left ? 'md:order-1' : 'md:order-2'}>
                      <div className="text-5xl font-semibold text-[var(--color-line)] md:text-6xl">
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{s.title}</h2>
                      {s.summary && (
                        <p className="mt-5 max-w-md text-lg text-[var(--color-ink-soft)]">
                          {s.summary}
                        </p>
                      )}
                      {s.description && (
                        <div className="prose mt-5 max-w-none text-[var(--color-ink-soft)]">
                          <RichText data={s.description} />
                        </div>
                      )}
                      {s.highlights && s.highlights.length > 0 && (
                        <ul className="mt-7 flex flex-col gap-3">
                          {s.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-[var(--color-ink-soft)]"
                            >
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-ink)]" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {/* Image */}
                    <div className={left ? 'md:order-2' : 'md:order-1'}>
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-2)] ring-1 ring-[var(--color-line)]">
                        {img && (
                          <Image
                            src={img}
                            alt={s.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* How we work — step-by-step client journey */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow="Our Process"
              title="How we work, step by step."
              intro="Beyond what we make, here's the journey we run with you — a clear, predictable path from first conversation to final delivery."
            />
          </Reveal>
          <div className="mx-auto mt-16 max-w-5xl">
            <RevealGroup className="grid gap-x-14 gap-y-12 sm:grid-cols-2" stagger={0.1}>
              {steps.map(([title, body], i) => (
                <RevealItem key={title} className="flex gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-ink)] text-base font-semibold text-white">
                    {i + 1}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-1.5 text-[var(--color-ink-soft)]">{body}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl">
              Let&apos;s build your team&apos;s uniforms.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[var(--color-ink-soft)]">
              Tell us your requirements and we&apos;ll guide you from first consultation to final
              delivery.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/contact">
                <Button size="lg">Request a Quote</Button>
              </Link>
              <Link href="/catalog">
                <Button variant="outline" size="lg">
                  Explore Catalog
                </Button>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
