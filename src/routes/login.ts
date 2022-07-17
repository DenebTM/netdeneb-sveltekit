import type { RequestHandler } from '@sveltejs/kit'
import users from '$lib/users.json'
import cookie from 'cookie'

export const post: RequestHandler = async (event) => {
    let creds : {
        username: keyof typeof users | '' | undefined,
        password: string | undefined
    } = { username: undefined, password: undefined }
    try {
        creds = await event.request.json()
    } catch {
        /* invalid json idc */
    }

    const response : Record<string, any> = {
        status: 403,
        body: {
            status: 'Error',
            message: 'Username or password incorrect'
        },
        headers: {}
    }

    // no login specified
    if (!(creds.username && creds.password)) {
        return response
    }

    // invalid login
    if (users[creds.username] !== creds.password) {
        return response
    }

    // valid login
    response.status = 202
    response.body.status = 'OK'
    response.body.message = 'Login successful'
    response.headers['Set-Cookie'] = cookie.serialize('token', '🦊', { path: '/', maxAge: 86400 })
    return response
}