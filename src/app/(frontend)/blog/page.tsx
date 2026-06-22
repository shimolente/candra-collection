import Link from 'next/link'
import { Container, SectionHeading } from '@/components/site/primitives'
import { safeFind, mediaUrl } from '@/lib/data'

export const dynamic = 'force-dynamic'

// Blog is intentionally hidden from search until real, published articles exist
// (it's also excluded from sitemap.xml). The current cards are placeholders/drafts.
// To launch the blog for SEO: publish real Posts, then remove the `robots` line below.
export const metadata = {
  title: 'Blog — Artikel & Panduan Seragam | Candra Collection Bali',
  description:
    'Panduan bahan seragam, tips memilih vendor uniform, dan proses produksi seragam hotel & restaurant di Bali.',
  alternates: { canonical: '/blog' },
  robots: { index: false, follow: true },
}

type Post = {
  id: string
  title: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  coverImage?: unknown
}

const placeholders: Post[] = [
  { id: '1', title: 'Panduan Memilih Bahan Uniform', excerpt: 'Cotton, linen, drill — kelebihan tiap bahan untuk uniform.' },
  { id: '2', title: 'Tren Fashion Uniform 2026', excerpt: 'Arah desain uniform yang sedang diminati industri hospitality.' },
  { id: '3', title: 'Di Balik Proses Produksi Kami', excerpt: 'Dari pola hingga finishing — bagaimana uniform Anda dibuat.' },
]

export default async function BlogPage() {
  const posts = await safeFind<Post>('posts', { sort: '-publishedAt' })
  const items = posts.length ? posts : placeholders

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          eyebrow="Blog"
          title="Artikel & Panduan"
          intro="Panduan bahan, tren fashion, dan proses produksi."
        />
        <div className="mt-16 grid gap-px bg-[var(--color-line)] md:grid-cols-3">
          {items.map((p) => {
            const img = mediaUrl(p.coverImage)
            const href = p.slug ? `/blog/${p.slug}` : '/blog'
            return (
              <Link key={p.id} href={href} className="group bg-white">
                <div className="aspect-[3/2] overflow-hidden bg-[var(--color-paper-2)]">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={img}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="p-7">
                  {p.publishedAt && (
                    <div className="eyebrow mb-3">
                      {new Date(p.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  )}
                  <h3 className="text-2xl">{p.title}</h3>
                  {p.excerpt && (
                    <p className="mt-3 text-sm text-[var(--color-ink-soft)]">{p.excerpt}</p>
                  )}
                  <span className="eyebrow mt-4 inline-block opacity-0 transition-opacity group-hover:opacity-100">
                    Baca &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
