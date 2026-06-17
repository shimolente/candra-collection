import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <Skeleton className="h-4 w-24 rounded-sm" />
          <Skeleton className="mt-4 h-11 w-80 max-w-full rounded-sm" />
          <Skeleton className="mt-5 h-5 w-full max-w-md rounded-sm" />
          <div className="mt-12 grid gap-12 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-5 w-full rounded-sm" />
                <Skeleton className="h-5 w-full rounded-sm" />
                <Skeleton className="h-5 w-2/3 rounded-sm" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper)] py-20 md:py-28">
        <Container>
          <div className="grid gap-px bg-[var(--color-line)] md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-[var(--color-paper)] p-10">
                <Skeleton className="h-7 w-1/2 rounded-sm" />
                <Skeleton className="mt-3 h-4 w-full rounded-sm" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
