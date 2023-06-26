import { promises as fs } from 'fs'
import crypto from 'crypto'
import type { CookieSerializeOptions } from 'cookie'
import { basename, dirname, join as pathJoin } from 'path'
import { sessionCookieName } from './globals'
import { getConfig } from './appConfig'

export type SessionToken = string

let sessions: Session[] = []

export class Session {
  public token: SessionToken
  public expires: Date
  public username: string

  constructor(token: SessionToken, expires: Date, username: string) {
    this.token = token
    this.expires = expires
    this.username = username
  }

  public setExpiry = (expires: Date): void => {
    this.expires = expires
  }

  public extend = (): Session =>
    new Session(
      this.token,
      new Date(new Date().getTime() + 7200000),
      this.username
    )

  public toString = (): string =>
    `${this.token}|${this.expires.toISOString()}|${this.username}`

  public toCookie = (): [
    typeof sessionCookieName,
    typeof this.token,
    CookieSerializeOptions
  ] => [sessionCookieName, this.token, { path: '/', expires: this.expires }]

  public static parse = (str: string): Session => {
    const [id, expires, username] = str.split('|')
    return new Session(id, new Date(expires), username)
  }

  public static init = (username: string): Session =>
    new Session(
      crypto.randomBytes(16).toString('base64'),
      new Date(new Date().getTime() + 7200000), // why
      username
    )
}

const cleanupSessions = (): void => {
  sessions = sessions.filter(s => s.expires >= new Date())
}

export const createSession = (username: string): Session => {
  const session = Session.init(username)
  sessions.push(session)

  // await cleanupSessions()
  return session
}

export const destroySession = (token?: SessionToken): void => {
  sessions.find(s => s.token === token)?.setExpiry(new Date(0))
  cleanupSessions()
}

/**
 * returns a new session if the current one is still valid, or null if it isn't
 */
export const validateSession = (token?: SessionToken): Session | null => {
  const validSession = sessions.find(
    s => s.token === token && s.expires >= new Date()
  )

  if (validSession) {
    const newSession = validSession.extend()
    sessions = sessions.map(oldSession =>
      oldSession.token === token ? newSession : oldSession
    )

    return newSession
  } else {
    cleanupSessions()
    return null
  }
}

/**
 * writes the current session list first to a temporary file,
 * then to the final path if it has not changed in the meantime
 *
 * the session list on disk is not actively used, it only exists
 * for monitoring purposes
 */
const writeOutSessions = async (): Promise<void> => {
  const { sessionListPath } = await getConfig()

  const sessionListDir = dirname(sessionListPath)
  const sessionListFilename = basename(sessionListPath)

  const tmpFilePath = pathJoin(
    sessionListDir,
    '.tmp_' + crypto.randomBytes(4).toString('hex') + '_' + sessionListFilename
  )

  try {
    await fs.writeFile(
      tmpFilePath,
      sessions.map(session => session.toString()).join('\n'),
      { encoding: 'utf-8' }
    )

    if (
      (await fs.stat(sessionListPath).catch(() => ({ ctimeMs: 0 }))).ctimeMs <
      (await fs.stat(tmpFilePath)).ctimeMs
    ) {
      await fs.rename(tmpFilePath, sessionListPath)
    }
  } catch (err) {
    console.error(err)
  }
}

const periodicallyWriteOut = async (): Promise<void> => {
  writeOutSessions().finally(() =>
    setTimeout(() => {
      void periodicallyWriteOut()
    }, 30000)
  )
}
void periodicallyWriteOut()
