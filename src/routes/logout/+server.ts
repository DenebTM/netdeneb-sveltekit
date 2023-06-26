import type { RequestHandler } from './$types'
import { destroySession } from '~/util/session'
import cookie from 'cookie'
import { sessionCookieName } from '~/util/globals'

export const GET: RequestHandler = async ({ locals: { token } }) => {
  if (token !== '') destroySession(token)

  return new Response('logged out', {
    status: 307,
    headers: {
      'Set-Cookie': cookie.serialize(sessionCookieName, '', {
        path: '/',
        expires: new Date(0),
      }),
      Location: '/',
    },
  })
}

export const POST = GET
