import { getPayload } from 'payload'
import config from '@/payload.config'

export async function getClient() {
  return getPayload({ config: await config })
}

/** Safe find — returns [] if collection empty or DB not ready. */
export async function safeFind<T = unknown>(
  collection: string,
  opts: Record<string, unknown> = {},
): Promise<T[]> {
  try {
    const payload = await getClient()
    // @ts-expect-error dynamic collection slug
    const res = await payload.find({ collection, depth: 1, limit: 100, ...opts })
    return (res?.docs ?? []) as T[]
  } catch {
    return []
  }
}

export async function getGlobalSafe<T = unknown>(slug: string): Promise<T | null> {
  try {
    const payload = await getClient()
    // @ts-expect-error dynamic global slug
    const res = await payload.findGlobal({ slug, depth: 1 })
    return (res ?? null) as T
  } catch {
    return null
  }
}

export function mediaUrl(media: unknown): string | null {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: string }).url
    return url ?? null
  }
  return null
}
