import { getPayload } from 'payload'
import config from '../src/payload.config'
const main = async () => {
  const p = await getPayload({ config: await config })
  for (const c of ['categories','products','services','posts','clients']) {
    const r = await p.count({ collection: c as never })
    console.log('COUNT', c, r.totalDocs)
  }
  process.exit(0)
}
main()
