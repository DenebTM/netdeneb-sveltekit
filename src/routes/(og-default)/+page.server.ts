// @ts-expect-error -- the `PageServerLoad` type import is broken for route groups
import type { PageServerLoad } from '../$types'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- see line 1
export const load = (() => {
  // TODO: un-hardcode this
  const birthDate = Date.UTC(2000, 11, 22)
  const age = new Date(Date.now() - birthDate).getFullYear() - 1970

  return { age }
}) satisfies PageServerLoad
