import type { Handle } from "@sveltejs/kit"
import cookie from 'cookie'

export const handle: Handle = ({ event, resolve }) => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '')
    event.locals.token = cookies['token']

    return resolve(event)
}