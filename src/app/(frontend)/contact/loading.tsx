import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Skeleton className="h-4 w-20 rounded-sm" />
        <Skeleton className="mt-4 h-11 w-80 max-w-full rounded-sm" />
        <Skeleton className="mt-5 h-5 w-full max-w-xl rounded-sm" />

        <div className="mt-16 grid gap-16 md:grid-cols-2">
          {/* Form */}
          <div className="space-y-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-sm" />
            ))}
            <Skeleton className="h-32 w-full rounded-sm" />
            <Skeleton className="h-12 w-40 rounded-sm" />
          </div>

          {/* Info */}
          <div className="space-y-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border-b border-[var(--color-line)] pb-6">
                <Skeleton className="h-3 w-20 rounded-sm" />
                <Skeleton className="mt-2 h-6 w-2/3 rounded-sm" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
