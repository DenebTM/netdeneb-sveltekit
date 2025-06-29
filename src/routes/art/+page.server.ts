import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import fs from 'node:fs/promises'
import { join as pathJoin } from 'node:path'
import { appConfig } from '~/util/appConfig'
import mime from 'mime-types'
import { imageSizeFromFile } from 'image-size/fromFile'

export const load: PageServerLoad = async () => {
  const { artBaseURL, artBasePath } = appConfig

  const fileListPath = pathJoin(artBasePath, 'files.json')

  let fileList: ArtList = []
  try {
    fileList = JSON.parse(
      await fs.readFile(fileListPath, { encoding: 'utf-8' })
    ) as ArtList
  } catch (err) {
    throw error(500, "'files.json' not found or invalid")
  }

  return {
    artBaseURL,
    imgList: await Promise.all(
      fileList.map(async (item: ArtItem): Promise<ArtItemWithMetadata> => {
        const dims = await imageSizeFromFile(`${artBasePath}/${item.full}`)
        return {
          ...item,
          fileName: pathJoin(artBaseURL, item.fileName),
          full: pathJoin(artBaseURL, item.full),
          width: dims.width ?? 0,
          height: dims.height ?? 0,
          mime: mime.lookup(item.full) || 'image/jpeg',
        }
      })
    ),
  }
}
