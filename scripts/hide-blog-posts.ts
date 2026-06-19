// One-off: unpublish all blog posts (set _status=draft) so the empty articles
// stop showing to anonymous visitors while the /blog routes stay in place.
// Run: node --import tsx --env-file=.env scripts/hide-blog-posts.ts
import { getPayload } from 'payload'
import config from '../src/payload.config'

const main = async () => {
  const payload = await getPayload({ config: await config })
  const { docs } = await payload.find({
    collection: 'posts',
    limit: 200,
    depth: 0,
    draft: true,
  })

  for (const post of docs) {
    if (post._status === 'draft') {
      console.log('SKIP (already draft):', post.title)
      continue
    }
    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { _status: 'draft' },
    })
    console.log('UNPUBLISHED:', post.title)
  }

  console.log(`Done. Processed ${docs.length} post(s).`)
  process.exit(0)
}

main()
