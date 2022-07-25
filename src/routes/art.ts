import type { RequestHandler } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { join as pathJoin } from 'path'
import { artBase } from '$lib/config'

export const GET: RequestHandler = async () => {
    const fileListPath = pathJoin(artBase, 'files.json')

    let fileList
    try {
        fileList = (JSON.parse(await fs.readFile(fileListPath, { encoding: 'utf-8' })) as ArtList)
    } catch (err) {
        console.error(err)
    }

    if (fileList) {
        return {
            status: 200,
            body: {
                imgList: fileList.map(i => Object.assign(i, { fileName: `/art/${i.fileName}` }))
            }
        }
    } else {
        return {
            status: 404,
            body: '"files.json not found in /art"'
        }
    }
}