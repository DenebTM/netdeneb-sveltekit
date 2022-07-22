import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { join as pathJoin } from 'path'
import { artBase } from '$lib/config'

export const GET: RequestHandler = async () => {
    const fileListPath = pathJoin(artBase, 'files.json')
    let response : ArtList

    let fileList
    try {
        fileList = JSON.parse(await fs.readFile(fileListPath, { encoding: 'utf-8' }))
    } catch (err) {
        console.error(err)
    }

    if (fileList) {
        response = fileList
    } else {
        response = (await fs.readdir(artBase, { withFileTypes: true }))
            .filter(de => de.isFile())
            .map(de => ({ name: de.name, artistLink: undefined }))
    }

    return {
        status: 200,
        body: {
            fileList: response
        }
    }
}