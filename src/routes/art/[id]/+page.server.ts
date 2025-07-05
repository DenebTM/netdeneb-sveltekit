import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'
import { join as pathJoin } from 'node:path'
import mime from 'mime-types'
import { imageSizeFromFile } from 'image-size/fromFile'

import imageList from '../files.json'

export const load: PageServerLoad = async ({ params }) => {
  const image = imageList.find(item => item.id === params.id)
  if (typeof image === 'undefined') {
    error(404, { message: 'Image not found' })
  }

  const dims = await imageSizeFromFile(pathJoin('static/art', image.full))

  return {
    imageList,
    image: {
      ...image,
      fileName: pathJoin('/art', image.fileName),
      full: pathJoin('/art', image.full),
      width: dims.width ?? 0,
      height: dims.height ?? 0,
      mime: mime.lookup(image.full) || 'image/jpeg',
    },
  }
}
