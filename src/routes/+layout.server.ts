import fs from 'node:fs/promises'
import type { LayoutServerLoad } from './$types'
import { getConfig } from '~/util/appConfig'

export const load = (async ({ request }) => {
  const { navPath } = await getConfig()

  let navItems: Record<string, any> = {
    'Home': '/',
    'Art gallery': '/art',
  }

  try {
    navItems = JSON.parse((await fs.readFile(navPath)).toString())
  } catch (err) {}

  return { navItems }
}) satisfies LayoutServerLoad
