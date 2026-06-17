import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <>
      <section className="py-20 md:py-28">
        <Container>
          <Skeleton className="h-4 w-20 rounded-sm" />
          <Skeleton className="mt-4 h-11 w-96 max-w-full rounded-sm" />
          <Skeleton className="mt-5 h-5 w-full max-w-2xl rounded-sm" />
        </Container>
      </section>

      <section className="border-t border-[var(--color-line)]">
        <Container>
          <div className="flex flex-col">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="grid items-center gap-10 border-b border-[var(--color-line)] py-16 md:grid-cols-2 md:gap-16 md:py-24"
              >
                <div className={i % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                  <Skeleton className="h-14 w-16 rounded-sm" />
                  <Skeleton className="mt-4 h-9 w-1/2 rounded-sm" />
                  <Skeleton className="mt-5 h-5 w-full max-w-md rounded-sm" />
                  <div className="mt-7 space-y-3">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-4 w-3/4 rounded-sm" />
                    ))}
                  </div>
                </div>
                <div className={i % 2 === 0 ? 'md:order-2' : 'md:order-1'}>
                  <Skeleton className="aspect-[4/3] w-full" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
