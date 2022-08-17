import type { RequestHandler } from './$types'
import { destroySession } from '$lib/js/session'
import cookie from 'cookie'

export const GET: RequestHandler = async ({ locals: { token } }) => {
    if (token) await destroySession(token)

    return new Response('logged out', {
        status: 307,
        headers: {
            'Set-Cookie': cookie.serialize('token', '', { path: '/', expires: new Date(0) }),
            'Location': '/'
        }
    })
}

export const POST = GET