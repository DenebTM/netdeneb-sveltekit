import type { GetSession, Handle } from "@sveltejs/kit"
import cookie from 'cookie';

export const handle : Handle = ({ event, resolve }) => {
    return resolve(event)
}

export const getSession : GetSession = event => {
    const cookies = cookie.parse(event.request.headers.get('cookie') || '')
    
    return {
        token: cookies['token']
    }
}