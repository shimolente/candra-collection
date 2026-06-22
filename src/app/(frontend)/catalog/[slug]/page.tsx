import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Container } from '@/components/site/primitives'
import { Button } from '@/components/ui/button'
import { Card, CardMedia, CardBody, CardTitle } from '@/components/ui/card'
import { ProductGallery } from '@/components/site/ProductGallery'
import { safeFind, mediaUrl } from '@/lib/data'

export const revalidate = 3600 // ISR: cache 1h, revalidate hourly

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await safeFind<Product>('products', { where: { slug: { equals: slug } }, limit: 1 })
  const product = found[0]
  if (!product) return {}
  const firstImage = mediaUrl(product.gallery?.[0]?.image)
  return {
    title: `${product.title} Custom Bali | Seragam ${product.title} — Candra Collection`,
    description: product.shortDescription || `Custom ${product.title} made to order in Bali by Candra Collection. Seragam ${product.title} untuk hotel, restaurant, spa, dan corporate.`,
    alternates: { canonical: `/catalog/${slug}` },
    openGraph: {
      title: `${product.title} — Candra Collection Bali`,
      description: product.shortDescription || `Custom ${product.title} uniform made to order in Bali.`,
      ...(firstImage ? { images: [{ url: firstImage, alt: product.title }] } : {}),
    },
  }
}

type Product = {
  id: string | number
  title: string
  slug?: string
  shortDescription?: string
  material?: string
  description?: SerializedEditorState
  category?: { id?: string | number; name?: string; slug?: string }
  gallery?: { id?: string; image?: unknown }[]
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await safeFind<Product>('products', { where: { slug: { equals: slug } }, limit: 1 })
  const product = found[0]
  if (!product) notFound()

  const images = (product.gallery ?? []).map((g) => mediaUrl(g.image)).filter(Boolean) as string[]

  // Related — same category, exclude self
  const related = product.category?.slug
    ? (
        await safeFind<Product>('products', {
          where: {
            and: [
              { 'category.slug': { equals: product.category.slug } },
              { slug: { not_equals: slug } },
            ],
          },
          limit: 4,
        })
      ).slice(0, 4)
    : []

  return (
    <section className="py-12 md:py-20">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
          <Link href="/catalog" className="hover:text-[var(--color-ink)]">
            Catalog
          </Link>
          {product.category?.name && (
            <>
              <span className="mx-2">/</span>
              <Link
                href={`/catalog?category=${product.category.slug}`}
                className="hover:text-[var(--color-ink)]"
              >
                {product.category.name}
              </Link>
            </>
          )}
        </nav>

        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Gallery */}
          <ProductGallery images={images} title={product.title} />

          {/* Info */}
          <div>
            {product.category?.name && <div className="eyebrow mb-3">{product.category.name}</div>}
            <h1 className="text-4xl md:text-5xl">{product.title}</h1>
            {product.material && (
              <div className="mt-3 text-[var(--color-muted)]">Material — {product.material}</div>
            )}
            {product.shortDescription && (
              <p className="mt-6 text-lg text-[var(--color-ink-soft)]">{product.shortDescription}</p>
            )}
            {product.description && (
              <div className="prose mt-6 max-w-none text-[var(--color-ink-soft)]">
                <RichText data={product.description} />
              </div>
            )}

            <div className="mt-10 border-t border-[var(--color-line)] pt-8">
              <p className="text-sm text-[var(--color-muted)]">
                Interested in this product? Send a quote request — we&apos;ll help tailor it to your
                needs.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">Request a Quote</Button>
                </Link>
                <Link href="/catalog" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Back to Catalog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20 md:mt-28">
            <div className="eyebrow mb-8">Related Products</div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => {
                const img = mediaUrl(p.gallery?.[0]?.image)
                return (
                  <Link key={p.id} href={p.slug ? `/catalog/${p.slug}` : '/catalog'}>
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
                        <CardTitle className="text-lg">{p.title}</CardTitle>
                        {p.material && (
                          <div className="mt-1 text-sm text-[var(--color-muted)]">{p.material}</div>
                        )}
                      </CardBody>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
