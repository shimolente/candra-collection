import { Container, SectionHeading } from '@/components/site/primitives'
import { Reveal, RevealGroup, RevealItem } from '@/components/site/Reveal'
import { safeFind } from '@/lib/data'

export const dynamic = 'force-dynamic'

type Service = { id: string; title: string; summary?: string }

const fallback: Service[] = [
  { id: '1', title: 'Consultation', summary: 'We start by understanding your brand identity, dress code requirements, and quantity needs.' },
  { id: '2', title: 'Master Fitting', summary: 'Sample garments are produced and refined until every fit, fabric, and finish meets your standard.' },
  { id: '3', title: 'Custom Design', summary: 'Our team works with your brief — or builds from scratch — to create a uniform that reflects your brand.' },
  { id: '4', title: 'Bulk Production', summary: 'Consistent quality, accurate quantities, and on-schedule delivery — ready for your team when you need them.' },
]

export default async function ServicesPage() {
  const services = await safeFind<Service>('services', { sort: 'order' })
  const items = services.length ? services : fallback

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Our Services"
            intro="End-to-end uniform solutions — from first consultation to bulk production."
          />
        </Reveal>
        <RevealGroup className="mt-16 grid gap-px bg-[var(--color-line)] md:grid-cols-2" stagger={0.1}>
          {items.map((s, i) => (
            <RevealItem key={s.id} className="bg-white p-10">
              <div className="text-4xl font-semibold text-[var(--color-muted)]">0{i + 1}</div>
              <h3 className="mt-4 text-2xl font-semibold">{s.title}</h3>
              {s.summary && <p className="mt-3 text-[var(--color-ink-soft)]">{s.summary}</p>}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  )
}
