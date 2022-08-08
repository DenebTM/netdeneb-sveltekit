import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { join as pathJoin } from 'path'
import { artBase } from '$lib/config'

export const GET: RequestHandler = async () => {
    const fileListPath = pathJoin(artBase, 'files.json')

    let fileList
    try {
        fileList = JSON.parse(await fs.readFile(fileListPath, { encoding: 'utf-8' })) as ArtList
    } catch (err) {
        return {
            status: 500,
            body: Error('\'files.json\' not found or invalid')
        }
    }

    return {
        status: 200,
        body: {
            imgList: fileList.map(i => Object.assign(i, { fileName: `http://localhost:8000/${i.fileName}` }))
        }
    }
}