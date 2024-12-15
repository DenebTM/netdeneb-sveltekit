import type { PageServerLoad } from './$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

export const load = (async () => {
  const { infoJsonPath, friendlinksPath } = await getConfig()

  let socials: SociaList = []
  let friendlinks: FriendLink[] = []

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
    const friendlinksIn = JSON.parse(
      (await fs.readFile(friendlinksPath)).toString()
    ) as typeof friendlinks

    // shuffle the buttons
    friendlinks = []
    while (friendlinksIn.length > 0) {
      const index = Math.floor(Math.random() * friendlinksIn.length)
      friendlinks.unshift(...friendlinksIn.splice(index, 1))
    }

    friendlinks = friendlinks.map(({ domain, button, alt }) => {
      button = button !== null ? `/img/8831/${button}` : null
      return { domain, button, alt }
    })
  } catch (err) {
    console.error(err)
  }

  return { socials, friendlinks }
}) satisfies PageServerLoad
