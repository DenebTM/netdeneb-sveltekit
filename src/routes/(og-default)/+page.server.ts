// @ts-expect-error -- the `PageServerLoad` type import is broken for route groups
import type { PageServerLoad } from '../$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- see line 1
export const load = (async () => {
  const { infoJsonPath } = await getConfig()

  // TODO: un-hardcode this
  const birthDate = Date.UTC(2000, 11, 22)
  const age = new Date(Date.now() - birthDate).getFullYear() - 1970

  try {
    let { socials, titleImage } = JSON.parse(
      (await fs.readFile(infoJsonPath)).toString()
    ) as InfoJson

    socials = socials.map(social => {
      social.text = social.text.replace('\u200b', '<wbr />')
      return social
    })

    return { socials, titleImage, age }
  } catch (err) {
    console.error(err)
    return { socials: [], titleImage: null, age }
  }
}) satisfies PageServerLoad
