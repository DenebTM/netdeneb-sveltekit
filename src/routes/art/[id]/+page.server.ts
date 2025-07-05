import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import fs from 'node:fs/promises'
import { join as pathJoin } from 'node:path'
import mime from 'mime-types'
import { imageSizeFromFile } from 'image-size/fromFile'

export const load: PageServerLoad = async () => {
  let fileList: ArtList = []
  try {
    fileList = JSON.parse(
      await fs.readFile('static/art/files.json', { encoding: 'utf-8' })
    ) as ArtList
  } catch (err) {
    throw error(500, "'files.json' not found or invalid")
  }

  return {
    imgList: await Promise.all(
      fileList.map(async (item: ArtItem): Promise<ArtItemWithMetadata> => {
        const dims = await imageSizeFromFile(`static/art/${item.full}`)
        return {
          ...item,
          fileName: pathJoin('/art', item.fileName),
          full: pathJoin('/art', item.full),
          width: dims.width ?? 0,
          height: dims.height ?? 0,
          mime: mime.lookup(item.full) || 'image/jpeg',
        }
      })
    ),
  }
}
