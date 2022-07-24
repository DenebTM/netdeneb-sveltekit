import type { RequestHandler } from '@sveltejs/kit'
import { filesBase, excludeFiles } from '$lib/config'
import { join as pathJoin } from 'path'
import { promises as fs, constants as fsConstants } from 'fs'
import crypto from 'crypto'

type FileDirList = {
    dirList: Array<string>,
    fileList: Array<string>,
    availableThumbs: Record<string, string>,
    error: string | undefined
}
async function readDir(path: string): Promise<FileDirList> {
    let error = undefined
    try {
        path = pathJoin(filesBase, path)
        const list = (await fs.readdir(path, { withFileTypes: true }))
            .filter(de => (!de.name.startsWith('.')) && (excludeFiles.indexOf(de.name) === -1))

        const dirList = list.filter(de => de.isDirectory()).map(de => de.name)
        const fileList = list.filter(de => de.isFile()).map(de => de.name)
        const availableThumbs = await getAvailableThumbs(fileList, path)

        return { dirList, fileList, availableThumbs, error }
    } catch (err) {
        if (err instanceof Error)
            error = err.message

        return { 
            dirList: [],
            fileList: [],
            availableThumbs: {},
            error
        }
    }
}

const isImage = (f: string) => /\.(jpe?g|png|gif|webp|bmp)$/.test(f.toLowerCase())
async function getAvailableThumbs(fileList: string[], basePath: string) {
    let availableThumbs: Record<string, string> = {}
    for (let imageFileName of fileList.filter(f => isImage(f))) {
        const fullPath = pathJoin(basePath, imageFileName)
        const thumbFileName = `/thumbs/${crypto.createHash('md5').update(fullPath).digest('hex')}.webp`

        try {
            await fs.access(thumbFileName, fsConstants.F_OK)
            availableThumbs[imageFileName] = thumbFileName
        } catch {}
    }

    return availableThumbs
}

export const GET: RequestHandler = async ({ locals: { token }, params: { path } }) => {
    if (path.startsWith('/Users') && token !== '🦊') {
        return {
            status: 403,
            body: {
                status: 403,
                message: 'Unauthorized'
            }
        }
    }

    const { dirList, fileList, availableThumbs, error } = await readDir(path)

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
        body: { dirList, fileList, availableThumbs }
    }
}