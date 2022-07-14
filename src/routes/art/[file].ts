import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { join } from 'path'
import { artBase } from '$lib/js/config'

export const get: RequestHandler = async ({ params }) => {

    return {
        status: 200,
        body: await fs.readFile(join(artBase, params.file)),
        headers: {
            'Content-Type': 'image/png'
        }
    }
}