import { Container, SectionHeading } from '@/components/site/primitives'
import { Reveal, RevealGroup, RevealItem } from '@/components/site/Reveal'

export const dynamic = 'force-dynamic'

const values: [string, string][] = [
  ['Premium Quality', 'Fabrics and stitching held to a consistent, dependable standard.'],
  ['On-Time Delivery', 'Production runs to the schedule we agree on — no surprises.'],
  ['Service Guarantee', 'Any issue with a finished uniform is repaired again, free of charge.'],
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

      {/* How we work — step-by-step */}
      <section className="py-20 md:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow="Our Process"
              title="How we work, step by step."
              intro="A clear, predictable journey from first conversation to final delivery."
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
    </>
  )
}
