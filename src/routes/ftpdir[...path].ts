import type { RequestHandler } from '@sveltejs/kit'
import { filesBase, excludeFiles } from '$lib/config'
import { join as pathJoin } from 'path'
import { promises as fs } from 'fs'

type FileDirList = {
    dirList: Array<string>,
    fileList: Array<string>,
    error: string | undefined
}
async function readdir(path: string): Promise<FileDirList> {
    let error = undefined
    try {
        const list = (await fs.readdir(pathJoin(filesBase, path), { withFileTypes: true }))
            .filter(de => (!de.name.startsWith('.')) && (excludeFiles.indexOf(de.name) === -1))

        const dirList = list.filter(de => de.isDirectory()).map(de => de.name)
        const fileList = list.filter(de => de.isFile()).map(de => de.name)

        return { dirList, fileList, error }
    } catch (err) {
        if (err instanceof Error)
            error = err.message

        return { 
            dirList: [],
            fileList: [],
            error
        }
    }
}

export const get: RequestHandler = async ({ locals: { token }, params: { path } }) => {
    if (path.startsWith('/Users') && token !== '🦊') {
        return {
            status: 403, // https://i.redd.it/z6mbo9dyc1x51.jpg
            body: {
                status: 403,
                message: 'Unauthorized'
            }
        }
    }

    const { dirList, fileList, error } = await readdir(path)

    if (error) {
        return {
            status: 500,
            body: {
                status: 500,
                error
            }
        }
    }

    return {
        status: 200,
        body: { dirList, fileList }
    }
}