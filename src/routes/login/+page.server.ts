import type { PageServerLoad, Action } from './$types'
import users from '$lib/users.json'
import { createSession, validateSession } from '$lib/js/session'

// TODO: redirect here maybe?
export const load: PageServerLoad = async ({ locals: { token } }) => ({ validToken: await validateSession(token) })

export const POST: Action = async ({ request, setHeaders, url }) => {
    let creds: {
        username: keyof typeof users | '' | undefined,
        password: string | undefined,
        redirect: string | undefined
    } = { username: undefined, password: undefined, redirect: '/' }
    try {
        const formdata = await request.formData()
        Object.assign(creds, {
            username: formdata.get('username'),
            password: formdata.get('password')
        })
    } catch {
        /* invalid json idc */
    }

    const errorResponse = {
        status: 401,
        errors: {
            message: 'Username or password incorrect'
        }
    }

    // username or password missing from request
    if (!(creds.username && creds.password))
        return errorResponse

    // invalid login
    if (users[creds.username] !== creds.password)
        return errorResponse

    // valid login
    setHeaders({ 'Set-Cookie': (await createSession()).toCookie() })
    
    // TODO: actually use this, maybe
    return {
        location: url.searchParams.get('redirect') ?? '/'
    }
}