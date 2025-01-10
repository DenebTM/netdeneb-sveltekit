import type { LayoutServerLoad } from './$types'

import siteMetadata from './metadata.json'

export const load = (() => {
  return { siteMetadata }
}) satisfies LayoutServerLoad
