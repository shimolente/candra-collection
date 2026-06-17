import { Container } from '@/components/site/primitives'
import { Skeleton } from '@/components/site/Skeleton'

export default function Loading() {
  return (
    <article className="py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Skeleton className="h-3 w-28 rounded-sm" />
          <Skeleton className="mt-4 h-12 w-full rounded-sm" />
          <Skeleton className="mt-3 h-12 w-2/3 rounded-sm" />
          <Skeleton className="mt-10 aspect-[16/9] w-full" />
          <div className="mt-10 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className={`h-4 rounded-sm ${i % 4 === 3 ? 'w-1/2' : 'w-full'}`} />
            ))}
          </div>
        </div>
      </Container>
    </article>
  )
}
