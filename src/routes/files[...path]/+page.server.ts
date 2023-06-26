import type { PageServerLoad } from './$types'
import { error, redirect } from '@sveltejs/kit'
import { join as pathJoin } from 'node:path'
import { constants as fsConstants } from 'node:fs'
import fs from 'node:fs/promises'
import crypto from 'node:crypto'
import { validateSession } from '~/util/session'
import { getConfig } from '~/util/appConfig'

const readDir = async (path: string): Promise<FileDirList> => {
  const { filesLocalBasePath, excludeFiles } = await getConfig()

  let error
  try {
    path = pathJoin(filesLocalBasePath, path)
    const list = (await fs.readdir(path, { withFileTypes: true })).filter(
      de => !de.name.startsWith('.') && !excludeFiles.includes(de.name)
    )

    const dirList = list.filter(de => de.isDirectory()).map(de => de.name)
    const fileList = list.filter(de => de.isFile()).map(de => de.name)
    const availableThumbs = await getAvailableThumbs(fileList, path)

    return { dirList, fileList, availableThumbs, error }
  } catch (err) {
    if (err instanceof Error) error = err.message

    return {
      dirList: [],
      fileList: [],
      availableThumbs: {},
      error,
    }
  }
}

const isImage = (f: string): boolean =>
  /\.(jpe?g|png|gif|webp|bmp)$/.test(f.toLowerCase())

const getAvailableThumbs = async (
  fileList: string[],
  basePath: string
): Promise<Record<string, string>> => {
  const availableThumbs: Record<string, string> = {}
  for (const imageFileName of fileList.filter(f => isImage(f))) {
    const fullPath = pathJoin(basePath, imageFileName)
    const thumbFileName = `/thumbs/${crypto
      .createHash('md5')
      .update(fullPath)
      .digest('hex')}.webp`

    try {
      await fs.access(thumbFileName, fsConstants.F_OK)
      availableThumbs[imageFileName] = thumbFileName
    } catch {}
  }

  return availableThumbs
}

export const load: PageServerLoad = async ({
  locals: { token },
  params: { path },
}) => {
  const { filesPublicBasePath } = await getConfig()

  if (path.startsWith('/Users') && validateSession(token) === null) {
    throw redirect(
      307,
      `/login?redirect=${encodeURIComponent('/files' + path)}`
    )
  }

  const { dirList, fileList, availableThumbs, error: err } = await readDir(path)

  if (err) throw error(500, err)

  return { dirList, fileList, availableThumbs, filesPublicBasePath }
}
