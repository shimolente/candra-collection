import { cn } from '@/lib/utils'

/**
 * Sharp-cornered shimmer block matching the site's placeholder tone.
 * Pure CSS (animate-pulse) so it renders in route loading.tsx without a client boundary.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden className={cn('animate-pulse bg-[var(--color-paper-2)]', className)} />
}
