import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { Container } from '@/components/site/primitives'
import { Button } from '@/components/ui/button'
import { safeFind, mediaUrl } from '@/lib/data'

export const dynamic = 'force-dynamic'

type Post = {
  id: string | number
  title: string
  slug?: string
  excerpt?: string
  publishedAt?: string
  coverImage?: unknown
  content?: SerializedEditorState
}

const fmt = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const found = await safeFind<Post>('posts', { where: { slug: { equals: slug } }, limit: 1 })
  const post = found[0]
  if (!post) notFound()

  const cover = mediaUrl(post.coverImage)
  const date = fmt(post.publishedAt)

  const recent = (
    await safeFind<Post>('posts', {
      where: { slug: { not_equals: slug } },
      sort: '-publishedAt',
      limit: 3,
    })
  ).slice(0, 3)

  return (
    <article className="py-12 md:py-20">
      <Container>
        {/* Header */}
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8 text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
            <Link href="/blog" className="hover:text-[var(--color-ink)]">
              Blog
            </Link>
          </nav>
          {date && <div className="eyebrow mb-4">{date}</div>}
          <h1 className="text-4xl leading-[1.08] md:text-6xl">{post.title}</h1>
          {post.excerpt && (
            <p className="mt-6 text-lg text-[var(--color-ink-soft)]">{post.excerpt}</p>
          )}
        </div>

        {/* Cover */}
        <div className="mx-auto mt-10 max-w-4xl">
          <div className="aspect-[16/9] w-full overflow-hidden bg-[var(--color-paper-2)] ring-1 ring-[var(--color-line)]">
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={cover} alt={post.title} className="h-full w-full object-cover" />
            ) : null}
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto mt-12 max-w-3xl">
          {post.content ? (
            <div className="prose prose-neutral max-w-none text-[var(--color-ink-soft)] [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-[var(--color-ink)] [&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-[var(--color-ink)] [&_p]:mt-5 [&_a]:underline">
              <RichText data={post.content} />
            </div>
          ) : (
            <p className="text-[var(--color-muted)]">
              Isi artikel akan tampil di sini setelah ditulis melalui CMS.
            </p>
          )}

          <div className="mt-12 border-t border-[var(--color-line)] pt-8">
            <Link href="/blog">
              <Button variant="outline">&larr; Kembali ke Blog</Button>
            </Link>
          </div>
        </div>

        {/* Recent */}
        {recent.length > 0 && (
          <div className="mt-20 md:mt-28">
            <div className="eyebrow mb-8">Artikel Lainnya</div>
            <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-3">
              {recent.map((p) => {
                const img = mediaUrl(p.coverImage)
                return (
                  <Link
                    key={p.id}
                    href={p.slug ? `/blog/${p.slug}` : '/blog'}
                    className="group bg-white"
                  >
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
                    <div className="p-6">
                      {p.publishedAt && <div className="eyebrow mb-2">{fmt(p.publishedAt)}</div>}
                      <h3 className="text-xl">{p.title}</h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </Container>
    </article>
  )
}
