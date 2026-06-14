import { getPayload } from 'payload'
import config from '../src/payload.config'

// Link the uploaded hero photo(s) to the Home global's carousel.
const run = async () => {
  const payload = await getPayload({ config: await config })

  const media = await payload.find({ collection: 'media', limit: 100 })
  if (media.docs.length === 0) {
    payload.logger.info('No media uploaded — nothing to link.')
    process.exit(0)
  }

  // Use up to 3 uploaded images as hero slides.
  const slides = media.docs.slice(0, 3).map((m) => ({ image: m.id }))

  await payload.updateGlobal({
    slug: 'home',
    data: { heroSlides: slides, heroImage: media.docs[0].id },
  })

  payload.logger.info(`Linked ${slides.length} hero slide(s): ${media.docs.slice(0, 3).map((m) => m.filename).join(', ')}`)
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
