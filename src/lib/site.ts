/**
 * Canonical, absolute site origin (no trailing slash).
 * Priority: explicit env → Vercel production URL → known production domain.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  if (vercel) return `https://${vercel}`

  return 'https://candra-collection.vercel.app'
}
