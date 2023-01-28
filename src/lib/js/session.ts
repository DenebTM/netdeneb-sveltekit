import { promises as fs } from 'fs'
import { sessionListPath } from '$lib/config'
import crypto from 'crypto'

export class Session {
  public id: string
  public expires: Date
  constructor (id: string, expires: Date) {
    this.id = id
    this.expires = expires
  }

  public toString = (): string => `${this.id}|${this.expires.toISOString()}\n`

  public static parse = (str: string): Session => {
    const [id, expires] = str.split('|')
    return new Session(id, new Date(expires))
  }

  public static init = (): Session =>
    new Session(
      crypto.randomBytes(16).toString('base64'),
      new Date(new Date().getTime() + 7200000) // why
    )
}

const getSessions = async (): Promise<Session[]> => {
  try {
    return (await fs.readFile(sessionListPath, { encoding: 'utf-8' }))
      .split('\n')
      .filter(s => s.length > 0)
      .map(s => Session.parse(s))
  } catch {
    return []
  }
}

const writeSessions = async (sessions: Session[]): Promise<void> => {
  await fs.writeFile(
    sessionListPath,
    sessions.reduce((acc, cur) => acc + cur.toString(), ''),
    { encoding: 'utf-8' }
  )
}

export const cleanupSessions = async (): Promise<void> => {
  const validSessions = (await getSessions()).filter(
    s => s.expires >= new Date()
  )

  await writeSessions(validSessions)
}

export const createSession = async (): Promise<Session> => {
  const sess = Session.init()
  await fs.appendFile(sessionListPath, sess.toString(), { encoding: 'utf-8' })

  // await cleanupSessions()
  return sess
}

export const destroySession = async (id: string): Promise<void> => {
  const validSessions = (await getSessions()).filter(s => s.id !== id)

  await writeSessions(validSessions)
  await cleanupSessions()
}

export const isSessionValid = async (id: string): Promise<boolean> => {
  return ((await getSessions()).find(s => s.id === id && s.expires >= new Date()) != null)
}
