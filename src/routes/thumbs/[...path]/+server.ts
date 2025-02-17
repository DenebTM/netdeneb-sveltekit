import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { join as pathJoin, sep as pathSep, dirname, extname } from 'node:path'
import { promises as fs, existsSync as exists } from 'node:fs'
import gm from 'gm'
import { promisify } from 'util'
import { appConfig } from '~/util/appConfig'

const validExtensions = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.tiff',
  '.bmp',
  '.heif',
  '.heic',
  '.svg',
]

const getSourceFilename = (path: string): string => {
  if (!validExtensions.includes(extname(path).toLowerCase())) {
    throw error(400, 'Not an image file')
  }

  const { filesBasePath } = appConfig

  const imgFileName = pathJoin(filesBasePath, path)
  // console.log(imgFileName)
  if (!exists(imgFileName)) {
    throw error(400, 'Source file does not exist')
  }

  return imgFileName
}

const getThumbName = (
  sourceFilename: string,
  path: string
): { thumbFilename: string; thumbURL: string } => {
  const { thumbsBasePath, thumbsBaseURL } = appConfig

  const thumbFilename = `${pathJoin(thumbsBasePath, path)}${
    extname(sourceFilename) !== '.gif' ? '.webp' : ''
  }`
  const thumbURL = `${pathJoin(thumbsBaseURL, path)}.webp`
    .split(pathSep)
    .map(c => encodeURIComponent(c))
    .join('/')

  return {
    thumbFilename,
    thumbURL,
  }
}

const createThumb = async (
  sourceFilename: string,
  thumbFilename: string
): Promise<void> => {
  switch (extname(sourceFilename)) {
    // copy GIFs instead of generating a thumbnail
    case '.gif':
      await fs.copyFile(sourceFilename, thumbFilename)
      break

    default:
      console.log(`generating thumbnail for ${sourceFilename}`)

      try {
        await promisify<void>(callback =>
          gm(sourceFilename)
            .resize(512, 512, '^')
            .gravity('Center')
            .extent(512, 512)
            .write(thumbFilename, err => err !== null && callback(err))
        )()
      } catch (err) {
        console.error(err)
        throw error(500, 'Thumbnail generation failed')
      }
  }
}

export const GET: RequestHandler = async ({ params: { path } }) => {
  if (!path) {
    throw error(400, 'Missing file name')
  }

  const sourceFilename = getSourceFilename(path)

  const { thumbFilename, thumbURL } = getThumbName(sourceFilename, path)
  if (!exists(dirname(thumbFilename))) {
    await fs.mkdir(dirname(thumbFilename), { recursive: true })
  }

  // generate new thumbnail if one does not already exist
  if (!exists(thumbFilename)) {
    try {
      await createThumb(sourceFilename, thumbFilename)
    } catch (err) {
      throw error(500, String(err))
    }
  }

  // redirect to new or existing thumbnail
  throw redirect(308, thumbURL)
}
