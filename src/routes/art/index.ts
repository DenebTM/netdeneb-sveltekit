import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { join } from 'path'
import { artBase } from '$lib/js/config'

export const get: RequestHandler = async () => {
    const fileList = JSON.parse(await fs.readFile(join(artBase, 'files.json'), { encoding: 'utf-8' }))
    let response : Array<{
        name: string,
        artistLink: string
    }>
    if (fileList) {
        response = fileList
    } else {
        response = (await fs.readdir(artBase, { withFileTypes: true }))
            .filter(de => de.isFile())
            .map(de => ({ name: de.name, artistLink: '' }))
    }

    return {
        status: 200,
        body: {
            fileList: response
        }
    }
}