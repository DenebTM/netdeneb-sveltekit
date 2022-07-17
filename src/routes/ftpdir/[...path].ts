// Not done yet

import type { RequestHandler } from '@sveltejs/kit'
import { filesBase } from '$lib/js/config'
import { join as pathJoin } from 'path'
import { promises as fs } from 'fs'

type FileDirList = {
    dirList: Array<string>,
    fileList: Array<string>
}
async function readdir(path: string): Promise<FileDirList> {
    const list = await fs.readdir(pathJoin(filesBase, path), { withFileTypes: true })
    const dirList = list.filter(de => de.isDirectory()).map(de => de.name)
    const fileList = list.filter(de => de.isFile()).map(de => de.name)

    return { dirList, fileList }
}

export const get: RequestHandler = async ({ params: { path } }) => {
    const { dirList, fileList } = await readdir(path)

    return {
        status: 200,
        body: { dirList, fileList }
    }
}