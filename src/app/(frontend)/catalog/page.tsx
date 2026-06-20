import Link from 'next/link'
import { Container, SectionHeading } from '@/components/site/primitives'
import { Card, CardMedia, CardBody, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { safeFind, mediaUrl } from '@/lib/data'
import { cn } from '@/lib/utils'

export const revalidate = 3600 // ISR: cache 1h, revalidate hourly

export const metadata = {
  title: 'Catalog — Custom Uniforms | Candra Collection Bali',
  description: 'Browse our full catalog of custom uniforms — hotel, restaurant, spa, corporate, batik, and more. Made to order in Bali, delivered across Indonesia.',
}

type Category = { id: string | number; name: string; slug?: string }
type Product = {
  id: string | number
  title: string
  slug?: string
  shortDescription?: string
  material?: string
  category?: { name?: string; slug?: string }
  gallery?: { image?: unknown }[]
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: active } = await searchParams
  const categories = await safeFind<Category>('categories', { sort: 'order' })

  const where =
    active && active !== 'all'
      ? { where: { 'category.slug': { equals: active } } }
      : {}
  const products = await safeFind<Product>('products', { sort: '-updatedAt', ...where })

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Catalog"
          title="Our Catalog"
          intro="Premium uniforms & apparel, filterable by category. Every piece is available for custom order."
        />

        {/* Filter */}
        {categories.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            <FilterChip href="/catalog" label="All" active={!active || active === 'all'} />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                href={`/catalog?category=${c.slug}`}
                label={c.name}
                active={active === c.slug}
              />
            ))}
          </div>
        )}

        {/* Grid */}
        {products.length === 0 ? (
          <p className="mt-16 text-[var(--color-muted)]">No products in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((p) => {
              const img = mediaUrl(p.gallery?.[0]?.image)
              const href = p.slug ? `/catalog/${p.slug}` : '/catalog'
              return (
                <Link key={p.id} href={href}>
                  <Card className="h-full">
                    <CardMedia>
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={img}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                    </CardMedia>
                    <CardBody>
                      {p.category?.name && <div className="eyebrow mb-2">{p.category.name}</div>}
                      <CardTitle>{p.title}</CardTitle>
                      {p.material && (
                        <div className="mt-1 text-sm text-[var(--color-muted)]">{p.material}</div>
                      )}
                    </CardBody>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/contact">
            <Button variant="outline">Request a Quote</Button>
          </Link>
        </div>
      </Container>
    </section>
  )
}

function FilterChip({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        'border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition-colors',
        active
          ? 'border-[var(--color-ink)] bg-[var(--color-ink)] text-white'
          : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]',
      )}
    >
      {label}
    </Link>
  )
}
