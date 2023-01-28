import { isSessionValid } from '$lib/js/session'
import type { LayoutServerLoad } from './$types'
import cookie from 'cookie'

export const load: LayoutServerLoad = async ({ request }) => {
  const { token } = cookie.parse(request.headers.get('cookie') ?? 'token=')
  return {
    hasValidToken: await isSessionValid(token),
  }
}
