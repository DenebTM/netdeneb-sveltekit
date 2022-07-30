import { promises as fs } from 'fs'
import { sessionListPath } from '$lib/config'
import crypto from 'crypto'
import cookie from 'cookie'

export class Session {
    public id: string
    public expires: Date
    constructor(id: string, expires: Date) {
        this.id = id
        this.expires = expires
    }
    public toString = () => `${this.id}|${this.expires.toISOString()}\n`
    public toCookie = () => cookie.serialize('token', this.id, { path: '/', expires: this.expires })

    public static parse = (str: string) => {
        const [ id, expires ] = str.split('|')
        return new Session(id, new Date(expires))
    }
    public static init = () => new Session(
        crypto.randomBytes(16).toString('base64'),
        new Date(new Date().getTime() + 7200000) // why
    )
}

async function getSessions() {
    try {
        return (await fs.readFile(sessionListPath, { encoding: 'utf-8' }))
            .split('\n').filter(s => s.length > 0).map(s => Session.parse(s))
    } catch {
        return []
    }
}

async function writeSessions(sessions: Session[]) {
    await fs.writeFile(sessionListPath, sessions.reduce((acc, cur) => acc + cur.toString(), ''), { encoding: 'utf-8' })
}

export async function cleanupSessions() {
    const validSessions = (await getSessions())
        .filter(s => s.expires >= new Date())
    
    await writeSessions(validSessions)
}

export async function createSession() {
    const sess = Session.init()
    await fs.appendFile(sessionListPath, sess.toString(), { encoding: 'utf-8' })

    // await cleanupSessions()
    return sess
}

export async function destroySession(id: string) {
    const validSessions = (await getSessions())
        .filter(s => s.id != id)

    await writeSessions(validSessions)
    await cleanupSessions()
}

export async function validateSession(id: string) {
    return (await getSessions()).find(s => s.id == id && s.expires >= new Date()) ? true : false
}