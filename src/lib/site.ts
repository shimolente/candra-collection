/**
 * Canonical, absolute site origin (no trailing slash).
 * Priority: NEXT_PUBLIC_SITE_URL (build-time) → SITE_URL (runtime) → production domain.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL
  if (explicit) return explicit.replace(/\/$/, '')
  return 'https://candracollectionuniform.com'
}
