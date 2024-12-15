import type { PageServerLoad } from './$types'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

export const load = (async () => {
  const { infoJsonPath, friendlinksPath } = await getConfig()

  let socials: SociaList = []
  let friendlinks: FriendLink[] = []

  try {
    let {} = ({ socials } = JSON.parse(
      (await fs.readFile(infoJsonPath)).toString()
    ))
  } catch (err) {
    console.error(err)
  }

  try {
    let friendlinks_in: typeof friendlinks = JSON.parse(
      (await fs.readFile(friendlinksPath)).toString()
    )

    // shuffle the buttons
    friendlinks = []
    while (friendlinks_in.length > 0) {
      const index = Math.floor(Math.random() * friendlinks_in.length)
      friendlinks.unshift(...friendlinks_in.splice(index, 1))
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
