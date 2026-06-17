import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <Skeleton className="aspect-[3/4] w-full" />
          <div>
            <Skeleton className="h-3 w-24 rounded-sm" />
            <Skeleton className="mt-4 h-10 w-3/4 rounded-sm" />
            <Skeleton className="mt-6 h-5 w-full rounded-sm" />
            <Skeleton className="mt-2 h-5 w-full rounded-sm" />
            <Skeleton className="mt-2 h-5 w-2/3 rounded-sm" />
            <Skeleton className="mt-8 h-12 w-44 rounded-sm" />
          </div>
        </div>
      </Container>
    </section>
  )
}
