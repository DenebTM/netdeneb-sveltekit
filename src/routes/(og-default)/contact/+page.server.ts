import type { PageServerLoad } from './$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

export const load = (async () => {
  const { infoJsonPath } = await getConfig()

  try {
    const { socials }: InfoJson = JSON.parse(
      (await fs.readFile(infoJsonPath)).toString()
    )

    return { socials }
  } catch (err) {
    console.error(err)
    return { socials: [] }
  }
}) satisfies PageServerLoad
