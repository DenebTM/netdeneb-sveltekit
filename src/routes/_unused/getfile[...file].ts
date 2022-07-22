import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'

export const GET: RequestHandler = async ({ params: { file } }) => {
    if (!(file.startsWith('/files/') || file.startsWith('/art/')))
        return {
            status: 403,
            body: 'Permission denied'
        }

    return {
        status: 200,
        body: await fs.readFile(file)
    }
}