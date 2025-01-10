import type { PageServerLoad } from './$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

const shuffleButtons = (
  buttons: Buttons,
  buttonsIn: Buttons,
  key: keyof Buttons
): void => {
  buttons[key] = []
  while (buttonsIn[key].length > 0) {
    const index = Math.floor(Math.random() * buttonsIn[key].length)
    buttons[key].unshift(...buttonsIn[key].splice(index, 1))
  }
}

export const load = (async () => {
  const { infoJsonPath, buttonsPath } = await getConfig()

  let socials: SociaList = []
  const buttons: Buttons = {
    general: [],
    webFriends: [],
    webMisc: [],
  }

  try {
    ;({ socials } = JSON.parse(
      (await fs.readFile(infoJsonPath)).toString()
    ) as InfoJson)

    socials = socials.map(social => {
      social.text = social.text.replace('\u200b', '<wbr />')
      return social
    })
  } catch (err) {
    console.error(err)
  }

  try {
    const buttonsIn = JSON.parse(
      (await fs.readFile(buttonsPath)).toString()
    ) as typeof buttons

    // shuffle the buttons
    for (const key in buttons) {
      if (Object.hasOwn(buttons, key)) {
        shuffleButtons(buttons, buttonsIn, key as keyof Buttons)
      }
    }
  } catch (err) {
    console.error(err)
  }

  return { socials, buttons }
}) satisfies PageServerLoad
