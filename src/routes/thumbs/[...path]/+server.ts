import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { join as pathJoin, sep as pathSep, dirname, extname } from 'node:path'
import { promises as fs, existsSync as exists } from 'node:fs'
import gm from 'gm'
import { getConfig } from '~/util/appConfig'

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

export const GET: RequestHandler = async ({ params: { path } }) => {
  if (!path) {
    throw error(400, 'Missing file name')
  }

  if (!validExtensions.includes(extname(path))) {
    throw error(400, 'Not an image file')
  }

  const { thumbsBasePath, thumbsBaseURL, filesBasePath } = await getConfig()

  const imgFileName = pathJoin(filesBasePath, path)
  // console.log(imgFileName)
  if (!exists(imgFileName)) {
    throw error(400, 'Source file does not exist')
  }

  // copy GIFs instead of generating a thumbnail
  const thumbFileName = `${pathJoin(thumbsBasePath, path)}${
    extname(imgFileName) !== '.gif' ? '.webp' : ''
  }`
  const thumbURL = `${pathJoin(thumbsBaseURL, path)}.webp`
    .split(pathSep)
    .map(c => encodeURIComponent(c))
    .join('/')

  // create path to new thumbnail if it does not exist
  const thumbDirName = dirname(thumbFileName)
  if (!exists(thumbDirName)) {
    await fs.mkdir(thumbDirName, { recursive: true })
  }

  // generate new thumbnail if one does not already exist
  if (!exists(thumbFileName)) {
    try {
      if (extname(imgFileName) === '.gif') {
        await fs.copyFile(imgFileName, thumbFileName)
      } else {
        await new Promise((resolve, reject) => {
          console.log(`generating thumbnail for ${imgFileName}`)
          gm(imgFileName)
            .resize(512, 512, '^')
            .gravity('Center')
            .extent(512, 512)
            .write(thumbFileName, error => {
              if (error != null) {
                console.error(error)
                reject(error)
              }

              resolve(thumbFileName)
            })
        })
      }
    } catch (err) {
      throw error(500, String(err))
    }
  }

  // redirect to new or existing thumbnail
  throw redirect(308, thumbURL)
}
