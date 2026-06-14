import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/primitives'
import { Button } from '@/components/ui/button'
import { FaqAccordion, type FaqItem } from '@/components/site/FaqAccordion'
import { Reveal, RevealGroup, RevealItem } from '@/components/site/Reveal'
import { HeroCarousel } from '@/components/site/HeroCarousel'
import { HowWeWork } from '@/components/site/HowWeWork'
import { safeFind, getGlobalSafe, mediaUrl } from '@/lib/data'

export const dynamic = 'force-dynamic'

type Media = { url?: string; alt?: string }
type Category = { id: string; name: string; slug?: string; description?: string; image?: Media }
type Product = {
  id: string
  title: string
  slug?: string
  shortDescription?: string
  category?: { name?: string } | string
  gallery?: { image?: Media }[]
}
type Service = { id: string; title: string; summary?: string; order?: number; image?: Media }
type Client = { id: string; name: string; logo?: Media; url?: string }
type HomeGlobal = {
  heroEyebrow?: string
  heroHeading?: string
  heroSubheading?: string
  heroSlides?: { image?: Media }[]
  heroImage?: Media
  ctaLabel?: string
  ctaLink?: string
  videoHeading?: string
  videoText?: string
  companyVideo?: Media & { mimeType?: string }
  videoPoster?: Media
}
type FaqGlobal = { heading?: string; eyebrow?: string; items?: FaqItem[] }

// Approved copy fallbacks — chandra-collection-homepage-copy.md (WM-2026-CC-01)
const PROCESS_FALLBACK: Service[] = [
  { id: '1', title: 'Consultation', order: 1, summary: 'We start by understanding your brand identity, dress code requirements, and quantity needs.' },
  { id: '2', title: 'Master Fitting', order: 2, summary: 'Sample garments are produced and refined until every fit, fabric, and finish meets your standard.' },
  { id: '3', title: 'Custom Design', order: 3, summary: 'Our team works with your brief — or builds from scratch — to create a uniform that reflects your brand.' },
  { id: '4', title: 'Bulk Production', order: 4, summary: 'Consistent quality, accurate quantities, and on-schedule delivery — ready for your team when you need them.' },
]

const FAQ_FALLBACK: FaqItem[] = [
  { question: 'What is the minimum order quantity?', answer: 'Minimums vary by product. Reach out with your needs and we will advise the most cost-effective quantity for your team.' },
  { question: 'How long does production take?', answer: 'Lead times depend on quantity and complexity. We confirm a delivery schedule before production and deliver on time.' },
  { question: 'Can you match our brand colors and logo?', answer: 'Yes. We work from your brand guidelines — colors, logo placement, and finishing — to produce uniforms that represent your brand.' },
  { question: 'Do you provide samples before bulk production?', answer: 'Yes. We produce and refine sample garments until every fit, fabric, and finish meets your standard.' },
  { question: 'Do you deliver outside Bali?', answer: 'We serve hotels, restaurants, and businesses across Indonesia. Shipping is arranged based on your location.' },
]

export default async function HomePage() {
  const [home, faq, categories, featured, services, clients] = await Promise.all([
    getGlobalSafe<HomeGlobal>('home'),
    getGlobalSafe<FaqGlobal>('faq'),
    safeFind<Category>('categories', { sort: 'order' }),
    safeFind<Product>('products', { where: { featured: { equals: true } }, limit: 6 }),
    safeFind<Service>('services', { sort: 'order' }),
    safeFind<Client>('clients', { sort: 'order' }),
  ])

  const process = services.length ? services : PROCESS_FALLBACK
  const faqItems = faq?.items?.length ? faq.items : FAQ_FALLBACK
  const recent = featured.slice(0, 3)
  const ctaLink = home?.ctaLink || '/contact'

  // Hero carousel: CMS slides → single fallback image → 3 gradient placeholders
  const cmsSlides = (home?.heroSlides ?? [])
    .map((s) => ({ url: mediaUrl(s.image), alt: (s.image as Media)?.alt }))
    .filter((s) => s.url)
  const fallbackImg = mediaUrl(home?.heroImage)
  const heroSlides =
    cmsSlides.length > 0
      ? cmsSlides
      : fallbackImg
        ? [{ url: fallbackImg, alt: home?.heroImage?.alt }, { url: null }, { url: null }]
        : [{ url: null }, { url: null }, { url: null }]

  const videoUrl = mediaUrl(home?.companyVideo)
  const videoPoster = mediaUrl(home?.videoPoster)
  const servicesImg = fallbackImg || categories.map((c) => mediaUrl(c.image)).find(Boolean) || null

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-white px-6 pt-8 pb-6">
        <div>
          <div className="relative h-[calc(100svh-8.5rem)] min-h-[480px] w-full overflow-hidden bg-[var(--color-ink)] text-white">
            <HeroCarousel slides={heroSlides} />
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/15 to-black/25" />

            <div className="absolute inset-x-0 bottom-24 z-10 flex flex-col items-center px-6 text-center md:bottom-28">
              <RevealGroup stagger={0.1}>
                <RevealItem>
                  <div className="eyebrow text-white/75">
                    {home?.heroEyebrow || 'Custom Uniform Specialist — Bali'}
                  </div>
                </RevealItem>
                <RevealItem>
                  <h1 className="mx-auto mt-5 max-w-3xl text-[clamp(1.75rem,4.2vw,3rem)] font-medium leading-[1.08] text-white">
                    {home?.heroHeading || 'Uniforms That Represent Your Brand.'}
                  </h1>
                </RevealItem>
                <RevealItem>
                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href={ctaLink}>
                      <Button className="bg-white text-[var(--color-ink)] hover:bg-[var(--color-paper-2)]">
                        {home?.ctaLabel || 'Request a Quote'}
                      </Button>
                    </Link>
                    <Link href="/catalog">
                      <Button
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-[var(--color-ink)]"
                      >
                        Explore Catalog
                      </Button>
                    </Link>
                  </div>
                </RevealItem>
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENT WORKS ── */}
      {recent.length > 0 && (
        <section className="py-24 md:py-36">
          <Container>
            <Reveal>
              <div className="flex items-end justify-between gap-6">
                <SectionHeading title="Our Most Recent Works" />
                <Link href="/catalog" className="eyebrow shrink-0 whitespace-nowrap transition-colors hover:text-[var(--color-ink)]">
                  View More &rarr;
                </Link>
              </div>
            </Reveal>
            <RevealGroup className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
              {recent.map((p) => {
                const img = mediaUrl(p.gallery?.[0]?.image)
                const img2 = mediaUrl(p.gallery?.[1]?.image)
                const catName = typeof p.category === 'object' ? p.category?.name : undefined
                return (
                  <RevealItem key={p.id}>
                    <Link href={p.slug ? `/catalog/${p.slug}` : '/catalog'} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-paper-2)] ring-1 ring-[var(--color-line)]">
                        {img && (
                          <Image
                            src={img}
                            alt={p.title}
                            fill
                            className={`object-cover transition-all duration-700 ease-out ${
                              img2 ? 'group-hover:opacity-0' : 'group-hover:scale-105'
                            }`}
                          />
                        )}
                        {img2 && (
                          <Image
                            src={img2}
                            alt={p.title}
                            fill
                            className="object-cover opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100"
                          />
                        )}
                      </div>
                      <div className="mt-5 text-lg">{p.title}</div>
                      {(p.shortDescription || catName) && (
                        <div className="mt-1 text-sm text-[var(--color-muted)]">
                          {p.shortDescription || catName}
                        </div>
                      )}
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </Container>
        </section>
      )}

      {/* ── HOW WE WORK ── */}
      <section className="py-24 md:py-36">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <div className="eyebrow">Our Process</div>
              <h2 className="mt-5 text-4xl md:text-6xl">
                How we work.
                <br />
                <span className="text-[var(--color-muted)]">Crafted, not rushed.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-[var(--color-ink-soft)]">
                Every uniform follows the same rigorous process — from first conversation to final
                delivery — so the result always represents your brand.
              </p>
            </div>
          </Reveal>
          <HowWeWork steps={process} />
        </Container>
      </section>

      {/* ── OUR PRODUCTS (categories) ── */}
      {categories.length > 0 && (
        <section className="py-24 md:py-36">
          <Container>
            <Reveal>
              <SectionHeading
                eyebrow="Selected Products"
                title="Our Products"
                intro="Browse a selection from our catalog — shirts, corporate uniforms, polo, linen, and more. Each piece is available for custom order."
              />
            </Reveal>
            <RevealGroup
              className="mt-16 grid grid-cols-2 gap-px bg-[var(--color-line)] md:grid-cols-4"
              stagger={0.07}
            >
              {categories.map((c) => {
                const img = mediaUrl(c.image)
                return (
                  <RevealItem key={c.id}>
                    <Link
                      href={c.slug ? `/catalog?category=${c.slug}` : '/catalog'}
                      className="group relative flex aspect-square flex-col justify-end overflow-hidden bg-[var(--color-paper-2)] p-6 transition-colors hover:bg-[var(--color-paper)]"
                    >
                      {img ? (
                        <>
                          <Image
                            src={img}
                            alt={c.name}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                          <span className="relative text-2xl font-semibold text-white drop-shadow">
                            {c.name}
                          </span>
                        </>
                      ) : (
                        <span className="relative text-2xl font-semibold text-[var(--color-ink)]">
                          {c.name}
                        </span>
                      )}
                    </Link>
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </Container>
        </section>
      )}

      {/* ── SERVICES (per-service image, alternating rows) ── */}
      <section className="border-t border-[var(--color-line)] py-24 md:py-36">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="What We Do"
                title="Our Services"
                intro="We answer your need for contemporary uniforms — the best quality, at a fair price."
              />
              <Link
                href="/services"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-ink)] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:bg-[var(--color-ink)] hover:text-white"
              >
                See More Services
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 flex flex-col gap-px bg-[var(--color-line)] ring-1 ring-[var(--color-line)] md:mt-20">
            {process.map((s, i) => {
              const left = i % 2 === 0
              const svcImg =
                mediaUrl(s.image) ||
                categories.map((c) => mediaUrl(c.image)).filter(Boolean)[i] ||
                servicesImg
              return (
                <Reveal key={s.id}>
                  <div className="group grid items-stretch gap-px bg-[var(--color-line)] md:grid-cols-2">
                    {/* Text */}
                    <div
                      className={`flex flex-col justify-center bg-white p-10 md:p-16 ${
                        left ? 'md:order-1' : 'md:order-2'
                      }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-3xl font-bold text-[var(--color-line)] md:text-4xl">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                          {s.title}
                        </h3>
                      </div>
                      {s.summary && (
                        <p className="mt-5 max-w-md text-[var(--color-ink-soft)]">{s.summary}</p>
                      )}
                    </div>
                    {/* Image */}
                    <div
                      className={`relative aspect-[16/11] overflow-hidden bg-[var(--color-paper-2)] ${
                        left ? 'md:order-2' : 'md:order-1'
                      }`}
                    >
                      {svcImg && (
                        <Image
                          src={svcImg}
                          alt={s.title}
                          fill
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── COMPANY PROFILE (vertical video) ── */}
      <section className="bg-[var(--color-ink)] py-24 text-white md:py-36">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
            <div className="order-2 md:order-1">
              <Reveal>
                <div className="eyebrow text-white/50">Company Profile</div>
                <h2 className="mt-5 text-3xl text-white md:text-5xl">
                  {home?.videoHeading || 'We are Candra Collection Bali'}
                </h2>
                <p className="mt-6 max-w-md text-white/70">
                  {home?.videoText ||
                    'A look inside our studio — the people, the craft, and the care behind every uniform we make.'}
                </p>
                <Link
                  href={ctaLink}
                  className="eyebrow mt-8 inline-block text-white/70 transition-colors hover:text-white"
                >
                  Work With Us &rarr;
                </Link>
              </Reveal>
            </div>
            <div className="order-1 flex justify-center md:order-2 md:justify-end">
              <Reveal className="w-full max-w-[300px]">
                <div className="relative aspect-[9/16] w-full overflow-hidden bg-black/40 ring-1 ring-white/10">
                  {videoUrl ? (
                    <video
                      className="h-full w-full object-cover"
                      src={videoUrl}
                      poster={videoPoster || undefined}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                        <Play size={24} className="ml-0.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CLIENTS STRIP ── */}
      {clients.length > 0 && (
        <section className="border-b border-[var(--color-line)] py-20">
          <Container>
            <Reveal>
              <div className="eyebrow text-center">Trusted by Businesses Across Indonesia</div>
            </Reveal>
            <RevealGroup
              className="mt-10 flex flex-wrap items-center justify-center gap-x-16 gap-y-8"
              stagger={0.06}
            >
              {clients.map((c) => {
                const logo = mediaUrl(c.logo)
                return (
                  <RevealItem key={c.id}>
                    {logo ? (
                      <Image
                        src={logo}
                        alt={c.name}
                        width={120}
                        height={48}
                        className="h-10 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
                      />
                    ) : (
                      <span className="text-xl font-medium text-[var(--color-muted)]">{c.name}</span>
                    )}
                  </RevealItem>
                )
              })}
            </RevealGroup>
          </Container>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="py-24 md:py-36">
        <Container>
          <Reveal>
            <SectionHeading
              center
              eyebrow={faq?.eyebrow || 'Frequently Asked Questions'}
              title={faq?.heading || 'Your questions, answered.'}
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto max-w-3xl">
              <FaqAccordion items={faqItems} />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── CTA BAND ── */}
      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-24 md:py-36">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl">Ready to Dress Your Team?</h2>
            <p className="mx-auto mt-6 max-w-xl text-[var(--color-ink-soft)]">
              Tell us what you need. We&apos;ll take care of the rest — from first consultation to
              final delivery.
            </p>
            <div className="mt-12">
              <Link href={ctaLink}>
                <Button size="lg">Request a Quote</Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Or reach us directly via WhatsApp — we respond within one business day.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
