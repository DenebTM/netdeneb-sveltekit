import fs from 'node:fs/promises'
import { sessionCookieName } from '~/util/globals'
import { validateSession } from '~/util/session'
import type { LayoutServerLoad } from './$types'
import cookie from 'cookie'
import { getConfig } from '~/util/appConfig'

export const load = (async ({ request }) => {
  const { navPath } = await getConfig()

  const { [sessionCookieName]: token } = cookie.parse(
    request.headers.get('cookie') ?? `${sessionCookieName}=`
  )

  let navItems: Record<string, any> = {
    'Home': '/',
    'Art gallery': '/art',
    'Files': '/files',
  }

  try {
    navItems = JSON.parse((await fs.readFile(navPath)).toString())
  } catch (err) {}

  return {
    hasValidToken: validateSession(token) !== null,
    navItems,
  }
}) satisfies LayoutServerLoad
