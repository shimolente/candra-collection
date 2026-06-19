import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site'
import { safeFind } from '@/lib/data'

// Re-generate hourly so newly published products appear without a redeploy.
export const revalidate = 3600

type Product = { slug?: string; updatedAt?: string }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl()

  const staticRoutes = ['', '/about', '/catalog', '/services', '/clients', '/contact'].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : 0.7,
    }),
  )

  // /blog is intentionally excluded — hidden until real content exists.
  const products = await safeFind<Product>('products', { limit: 200 })
  const productRoutes = products
    .filter((p) => p.slug)
    .map((p) => ({
      url: `${base}/catalog/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : undefined,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticRoutes, ...productRoutes]
}
