import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Skeleton className="h-4 w-16 rounded-sm" />
        <Skeleton className="mt-4 h-11 w-72 max-w-full rounded-sm" />
        <Skeleton className="mt-5 h-5 w-full max-w-md rounded-sm" />

        <div className="mt-16 grid gap-px bg-[var(--color-line)] md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white">
              <Skeleton className="aspect-[3/2] w-full" />
              <div className="p-7">
                <Skeleton className="h-3 w-28 rounded-sm" />
                <Skeleton className="mt-3 h-7 w-3/4 rounded-sm" />
                <Skeleton className="mt-3 h-4 w-full rounded-sm" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
