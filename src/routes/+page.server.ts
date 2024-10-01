import type { PageServerLoad } from './$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

export const load = (async () => {
  const { infoJsonPath } = await getConfig()

  const birthDate = Date.UTC(2000, 11, 22)
  const age = new Date(Date.now() - birthDate).getFullYear() - 1970

  try {
    const { socials, titleImage }: InfoJson = JSON.parse(
      (await fs.readFile(infoJsonPath)).toString()
    )

    return { socials, titleImage, age }
  } catch (err) {
    console.error(err)
    return { socials: [], titleImage: null, age }
  }
}) satisfies PageServerLoad
