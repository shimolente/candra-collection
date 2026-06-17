import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <>
      <section className="pt-20 pb-12 md:pt-28 md:pb-16">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Skeleton className="mx-auto h-12 w-72 max-w-full rounded-sm" />
            <Skeleton className="mx-auto mt-6 h-5 w-full max-w-2xl rounded-sm" />
          </div>
        </Container>
      </section>

      <section className="pb-24 md:pb-36">
        <Container>
          <div className="grid grid-cols-2 border-t border-l border-[var(--color-line)] sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex aspect-[4/3] items-center justify-center border-r border-b border-[var(--color-line)] bg-white p-6"
              >
                <Skeleton className="h-12 w-28 rounded-sm" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
