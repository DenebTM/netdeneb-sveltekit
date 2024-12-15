import fs from 'node:fs/promises'
import type { LayoutServerLoad } from './$types'
import { getConfig } from '~/util/appConfig'

export const load = (async () => {
  const { navPath, siteMetadata } = await getConfig()

  let navItems: Navigation = {
    'Home': '/',
    'Art gallery': '/art',
  }

  try {
    navItems = JSON.parse((await fs.readFile(navPath)).toString()) as Navigation
  } catch (err) {}

  return { navItems, siteMetadata }
}) satisfies LayoutServerLoad
