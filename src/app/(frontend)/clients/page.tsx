import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/site/primitives'
import { Button } from '@/components/ui/button'
import { Reveal, RevealGroup, RevealItem } from '@/components/site/Reveal'
import { safeFind, mediaUrl } from '@/lib/data'

export const dynamic = 'force-dynamic'

type Media = { url?: string; alt?: string }
type Client = { id: string; name: string; logo?: Media; url?: string }

export const metadata = {
  title: 'Our Clients — Candra Collection',
  description:
    'Hotels, villas, restaurants, and brands across Indonesia that trust Candra Collection for their custom uniforms.',
}

export default async function ClientsPage() {
  const clients = await safeFind<Client>('clients', { sort: 'order' })

  return (
    <>
      {/* Heading */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl tracking-tight md:text-6xl">Our Clients</h1>
              <p className="mx-auto mt-6 max-w-2xl text-[var(--color-ink-soft)]">
                Hotels, villas, restaurants, cafes, and brands across Indonesia trust us to dress
                their teams. Their continued partnership is the proof of our craft and consistency.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Logo grid */}
      <section className="pb-24 md:pb-36">
        <Container>
          {clients.length > 0 ? (
            <RevealGroup
              className="grid auto-rows-fr grid-cols-2 border-t border-l border-[var(--color-line)] sm:grid-cols-3 lg:grid-cols-5"
              stagger={0.04}
            >
              {clients.map((c) => {
                const logo = mediaUrl(c.logo)
                const inner = (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-white p-6 transition-colors hover:bg-[var(--color-paper)]">
                    {logo ? (
                      <>
                        <Image
                          src={logo}
                          alt={c.name}
                          width={140}
                          height={64}
                          className="h-12 w-auto object-contain opacity-60 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                        />
                        <span className="eyebrow line-clamp-2 text-center">{c.name}</span>
                      </>
                    ) : (
                      <span className="line-clamp-3 text-center text-xl font-medium text-[var(--color-ink-soft)] transition-colors group-hover:text-[var(--color-ink)]">
                        {c.name}
                      </span>
                    )}
                  </div>
                )
                return (
                  <RevealItem
                    key={c.id}
                    className="group flex min-h-[9rem] border-r border-b border-[var(--color-line)]"
                  >
                    {c.url ? (
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </RevealItem>
                )
              })}
            </RevealGroup>
          ) : (
            <p className="text-center text-[var(--color-muted)]">
              Client list coming soon.
            </p>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-20 md:py-28">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl md:text-5xl">Join them.</h2>
            <p className="mx-auto mt-5 max-w-xl text-[var(--color-ink-soft)]">
              Tell us about your team and we&apos;ll craft uniforms that represent your brand.
            </p>
            <div className="mt-10">
              <Link href="/contact">
                <Button size="lg">Request a Quote</Button>
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
