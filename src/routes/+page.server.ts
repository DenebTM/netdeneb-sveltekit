import type { PageServerLoad } from './$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

export const load = (async () => {
  const { socialsPath } = await getConfig()

  try {
    const socials: SociaList = JSON.parse(
      (await fs.readFile(socialsPath)).toString()
    )

    return { socials }
  } catch (err) {
    return { socials: [] }
  }
}) satisfies PageServerLoad
