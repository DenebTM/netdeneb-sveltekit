import type { PageServerLoad } from './$types'

export const load = (() => {
  const birthDate = Date.UTC(2000, 11, 22)

  // TODO: un-hardcode this
  const age = new Date(Date.now() - birthDate).getFullYear() - 1970

  return { age }
}) satisfies PageServerLoad
