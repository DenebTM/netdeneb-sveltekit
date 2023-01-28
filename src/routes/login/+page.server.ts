import type { PageServerLoad } from './$types'
import users from '$lib/users.json'
import { createSession, isSessionValid } from '$lib/js/session'
import { redirect, error, type Actions } from '@sveltejs/kit'

// TODO: redirect here maybe?
export const load: PageServerLoad = async ({ locals: { token } }) => ({
  validToken: await isSessionValid(token),
})

export const actions: Actions = {
  default: async ({ request, cookies, url }) => {
    const creds: {
      username?: keyof typeof users | ''
      password?: string | undefined
      redirect?: string
    } = { username: undefined, password: undefined, redirect: '/' }
    try {
      const formdata = await request.formData()
      Object.assign(creds, {
        username: formdata.get('username'),
        password: formdata.get('password'),
      })
    } catch {
      /* invalid json idc */
    }

    // username or password missing from request
    if (!(creds.username && creds.password)) { return error(401, { message: 'Username or password incorrect' }) }

    // invalid login
    if (users[creds.username] !== creds.password) { return error(401, { message: 'Username or password incorrect' }) }

    // valid login
    const newSession = await createSession()
    cookies.set('token', newSession.id, {
      path: '/',
      expires: newSession.expires,
    })
    throw redirect(304, url.searchParams.get('redirect') ?? '/')
  },
}
