import { socialsPath } from '$lib/config'
import type { PageServerLoad } from './$types'

import { promises as fs } from 'fs'

export const load: PageServerLoad = async () => {
  try {
    const socials: SociaList = JSON.parse(
      (await fs.readFile(socialsPath)).toString()
    )

    return { socials }
  } catch (err) {
    return { socials: [] }
  }
}
