import { sessionCookieName } from '~/util/globals'
import { validateSession } from '~/util/session'
import type { LayoutServerLoad } from './$types'
import cookie from 'cookie'

export const load: LayoutServerLoad = async ({ request }) => {
  const { [sessionCookieName]: token } = cookie.parse(
    request.headers.get('cookie') ?? `${sessionCookieName}=`
  )

  return {
    hasValidToken: validateSession(token) !== null,
  }
}
