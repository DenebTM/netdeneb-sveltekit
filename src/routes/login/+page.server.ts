import type { PageServerLoad } from './$types'
import { createSession, validateSession } from '~/util/session'
import { redirect, error, type Actions } from '@sveltejs/kit'
import fs from 'node:fs/promises'
import { getConfig } from '~/util/appConfig'

// TODO: redirect here maybe?
export const load: PageServerLoad = async ({ locals: { token } }) => ({
  hasValidToken: validateSession(token) !== null,
})

export const actions: Actions = {
  default: async ({ request, cookies, url }) => {
    const { userListPath } = await getConfig()

    const users: Record<string, string> = JSON.parse(
      (
        await fs.readFile(userListPath).catch(() => Buffer.from('[]'))
      ).toString()
    )

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

    if (
      !(creds.username && creds.password) || // username or password missing from request
      users[creds.username] !== creds.password // invalid login
    ) {
      throw error(401, { message: 'Username or password incorrect' })
    }

    // valid login
    cookies.set(...createSession(creds.username).toCookie())
    throw redirect(303, url.searchParams.get('redirect') ?? '/')
  },
}
