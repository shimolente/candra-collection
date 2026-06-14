import { Container, SectionHeading } from '@/components/site/primitives'
import { ContactForm } from '@/components/site/ContactForm'
import { getGlobalSafe } from '@/lib/data'

export const dynamic = 'force-dynamic'

type ContactInfo = {
  whatsapp?: string
  email?: string
  address?: string
  instagram?: string
}

const FALLBACK_WA = '+62 812-3456-7890'
const FALLBACK_EMAIL = 'halo@candra-collection.com'

export default async function ContactPage() {
  const c = (await getGlobalSafe<ContactInfo>('contact')) ?? {}
  const whatsapp = c.whatsapp || FALLBACK_WA
  const email = c.email || FALLBACK_EMAIL

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="Request a Quote"
          intro="Tell us about your uniform needs — we'll help from design through production."
        />

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {/* Wired form — opens WhatsApp / email with prefilled message */}
          <ContactForm whatsapp={whatsapp} email={email} />

          {/* Info */}
          <div className="space-y-8">
            {[
              ['WhatsApp', whatsapp, `https://wa.me/${whatsapp.replace(/\D/g, '')}`],
              ['Email', email, `mailto:${email}`],
              ['Address', c.address || 'Denpasar, Bali, Indonesia', undefined],
              ['Instagram', c.instagram || '@candracollection', undefined],
            ].map(([label, value, href]) => (
              <div key={label} className="border-b border-[var(--color-line)] pb-6">
                <div className="eyebrow mb-2">{label}</div>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg transition-colors hover:text-[var(--color-muted)]"
                  >
                    {value}
                  </a>
                ) : (
                  <div className="text-lg">{value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
