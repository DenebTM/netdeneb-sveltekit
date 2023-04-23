import { sessionCookieName } from '$lib/js/globals'
import type { Handle } from '@sveltejs/kit'
import cookie from 'cookie'

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.request.headers.get('cookie') ?? '')
  event.locals.token = cookies[sessionCookieName]

  return resolve(event)
}
