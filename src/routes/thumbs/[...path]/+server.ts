import { error, redirect } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { join as pathJoin, dirname } from 'node:path'
import { promises as fs, existsSync as exists } from 'node:fs'
import gm from 'gm'
import { getConfig } from '~/util/appConfig'

export const GET: RequestHandler = async ({ params: { path } }) => {
  if (!path) {
    throw error(400, 'Missing file name')
  }

  const { thumbsBasePath, thumbsBaseURL, filesBasePath } = await getConfig()

  const imgFileName = pathJoin(filesBasePath, path)
  const thumbFileName = `${pathJoin(thumbsBasePath, path)}.webp`
  const thumbURL = `${pathJoin(thumbsBaseURL, path)}.webp`

  if (!exists(imgFileName)) {
    throw error(404, 'Image does not exist')
  }

  // create path to new thumbnail if it does not exist
  const thumbDirName = dirname(thumbFileName)
  if (!exists(thumbDirName)) {
    await fs.mkdir(thumbDirName, { recursive: true })
  }

  // generate new thumbnail if one does not already exist
  if (!exists(thumbFileName)) {
    try {
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
    } catch (err) {
      throw error(500, String(err))
    }
  }

  // redirect to new or existing thumbnail
  throw redirect(307, thumbURL)
}
