import type { RequestHandler } from '@sveltejs/kit'
import users from '$lib/users.json'
import { createSession, validateSession } from '$lib/js/session';

export const GET: RequestHandler = async ({ locals: { token } }) => {
    return {
        body: {
            validToken: await validateSession(token)
        }
    }
}

export const POST: RequestHandler = async ({ request }) => {
    let creds: {
        username: keyof typeof users | '' | undefined,
        password: string | undefined
    } = { username: undefined, password: undefined }
    try {
        creds = await request.json()
    } catch {
        /* invalid json idc */
    }

    const response: Record<string, any> = {
        status: 401,
        body: {
            status: 'Error',
            message: 'Username or password incorrect'
        },
        headers: {}
    }

    // no login specified
    if (!(creds?.username && creds?.password)) {
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
    response.headers['Set-Cookie'] = (await createSession()).toCookie()
    return response
}