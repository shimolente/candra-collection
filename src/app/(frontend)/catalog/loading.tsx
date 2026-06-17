import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Skeleton className="h-4 w-24 rounded-sm" />
        <Skeleton className="mt-4 h-11 w-80 max-w-full rounded-sm" />
        <Skeleton className="mt-5 h-5 w-full max-w-xl rounded-sm" />

        {/* Filter chips */}
        <div className="mt-12 flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-24 rounded-sm" />
          ))}
        </div>

        {/* Card grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[3/4] w-full" />
              <Skeleton className="mt-4 h-3 w-20 rounded-sm" />
              <Skeleton className="mt-2 h-5 w-3/4 rounded-sm" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
