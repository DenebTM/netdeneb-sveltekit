import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { promises as fs } from 'fs'
import { join as pathJoin } from 'path'
import { getConfig } from '~/util/appConfig'

export const load: PageServerLoad = async () => {
  const { artPublicBasePath, artLocalBasePath } = await getConfig()

  const fileListPath = pathJoin(artLocalBasePath, 'files.json')

  let fileList
  try {
    fileList = JSON.parse(
      await fs.readFile(fileListPath, { encoding: 'utf-8' })
    ) as ArtList
  } catch (err) {
    throw error(500, "'files.json' not found or invalid")
  }

  return {
    artPublicBasePath,
    imgList: fileList.map(i =>
      Object.assign(i, {
        fileName: pathJoin(artPublicBasePath, i.fileName),
        full: pathJoin(artPublicBasePath, i.full),
      })
    ),
  }
}
