import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { normalize } from 'path'

export const get: RequestHandler = async ({ params: { file } }) => {
    if (!(file.startsWith('/files/') || file.startsWith('/art/')))
        return {
            status: 403,
            body: 'Unauthorized'
        }

    return {
        status: 200,
        body: await fs.readFile(file)
    }
}