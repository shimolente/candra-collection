import { getPayload } from 'payload'
import config from '../src/payload.config'

// Apply approved English homepage copy — chandra-collection-homepage-copy.md (WM-2026-CC-01)
const services: Record<string, string> = {
  Consultation: 'We start by understanding your brand identity, dress code requirements, and quantity needs.',
  'Master Fitting': 'Sample garments are produced and refined until every fit, fabric, and finish meets your standard.',
  'Custom Design': 'Our team works with your brief — or builds from scratch — to create a uniform that reflects your brand.',
  'Bulk Production': 'Consistent quality, accurate quantities, and on-schedule delivery — ready for your team when you need them.',
}

const faqItems = [
  { question: 'What is the minimum order quantity?', answer: 'Minimums vary by product. Reach out with your needs and we will advise the most cost-effective quantity for your team.' },
  { question: 'How long does production take?', answer: 'Lead times depend on quantity and complexity. We confirm a delivery schedule before production and deliver on time.' },
  { question: 'Can you match our brand colors and logo?', answer: 'Yes. We work from your brand guidelines — colors, logo placement, and finishing — to produce uniforms that represent your brand.' },
  { question: 'Do you provide samples before bulk production?', answer: 'Yes. We produce and refine sample garments until every fit, fabric, and finish meets your standard.' },
  { question: 'Do you deliver outside Bali?', answer: 'We serve hotels, restaurants, and businesses across Indonesia. Shipping is arranged based on your location.' },
]

const run = async () => {
  const payload = await getPayload({ config: await config })

  await payload.updateGlobal({
    slug: 'home',
    data: {
      heroEyebrow: 'Custom Uniform Specialist — Bali',
      heroHeading: 'Uniforms That Represent Your Brand.',
      heroSubheading:
        "From corporate offices to hospitality floors — we craft custom uniforms tailored to your team's identity, built to your exact specification.",
      ctaLabel: 'Request a Quote',
      ctaLink: '/contact',
    },
  })

  await payload.updateGlobal({
    slug: 'faq',
    data: {
      eyebrow: 'Frequently Asked Questions',
      heading: 'Your questions, answered.',
      items: faqItems,
    },
  })

  const existing = await payload.find({ collection: 'services', limit: 100 })
  for (const s of existing.docs) {
    const summary = services[s.title as string]
    if (summary) await payload.update({ collection: 'services', id: s.id, data: { summary } })
  }

  payload.logger.info('Copy updated to approved English ✓')
  process.exit(0)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
