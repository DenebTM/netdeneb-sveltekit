import type { RequestHandler } from '@sveltejs/kit'
import cookie from 'cookie';

export const get: RequestHandler = async ({ params: { file } }) => {
    return {
        status: 302,
        headers: {
            'Set-Cookie': cookie.serialize('token', '', { path: '/', expires: new Date(0) }),
            'Location': '/'
        }
    }
}

export const post = get