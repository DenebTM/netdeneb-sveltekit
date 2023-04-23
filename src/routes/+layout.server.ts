import { sessionCookieName } from '$lib/js/globals'
import { validateSession } from '$lib/js/session'
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
