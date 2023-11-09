import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import fs from 'node:fs/promises'
import { join as pathJoin } from 'node:path'
import { getConfig } from '~/util/appConfig'
import mime from 'mime-types'
import dimensions from 'image-size'

export const load: PageServerLoad = async () => {
  const { artBaseURL, artBasePath } = await getConfig()

  const fileListPath = pathJoin(artBasePath, 'files.json')

  let fileList
  try {
    fileList = JSON.parse(
      await fs.readFile(fileListPath, { encoding: 'utf-8' })
    ) as ArtList
  } catch (err) {
    throw error(500, "'files.json' not found or invalid")
  }

  return {
    artBaseURL,
    imgList: fileList
      .map((item: ArtItem): ArtItemWithMetadata => {
        const dims = dimensions(`${artBasePath}/${item.full}`)
        return {
          ...item,
          width: dims.width ?? 0,
          height: dims.height ?? 0,
          mime: mime.lookup(item.full) || 'image/jpeg',
        }
      })
      .map(item => ({
        ...item,
        fileName: pathJoin(artBaseURL, item.fileName),
        full: pathJoin(artBaseURL, item.full),
      })),
  }
}
