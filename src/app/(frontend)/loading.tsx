import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white px-6 pt-8 pb-6">
        <Skeleton className="h-[calc(100svh-8.5rem)] min-h-[480px] w-full" />
      </section>

      {/* Recent works */}
      <section className="py-24 md:py-36">
        <Container>
          <Skeleton className="h-10 w-72 max-w-full rounded-sm" />
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="mt-5 h-5 w-2/3 rounded-sm" />
                <Skeleton className="mt-2 h-4 w-1/2 rounded-sm" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Products grid */}
      <section className="py-24 md:py-36">
        <Container>
          <Skeleton className="h-10 w-64 max-w-full rounded-sm" />
          <div className="mt-16 grid grid-cols-2 gap-px md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
