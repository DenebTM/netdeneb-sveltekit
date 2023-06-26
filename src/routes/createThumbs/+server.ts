import { json as json$1 } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { join as pathJoin, parse as parsePath } from 'node:path'
import gm from 'gm'
import crypto from 'node:crypto'
import { getConfig } from '~/util/appConfig'

export const POST: RequestHandler = async ({ request }) => {
  const { filesPublicBasePath } = await getConfig()

  let paths: string[]
  const thumbFileNames: Record<string, string> = {}
  try {
    paths = ((await request.json()) as string[]).map(p =>
      pathJoin(filesPublicBasePath, p)
    )
    console.log('generating', thumbFileNames)
    await Promise.all(
      paths.map(
        async p =>
          new Promise((resolve, reject) => {
            console.log(`generating thumbnail for ${p}`)
            const base = parsePath(p).base
            const thumbFileName = `/thumbs/${crypto
              .createHash('md5')
              .update(p)
              .digest('hex')}.webp`
            gm(p)
              .resize(512, 512, '^')
              .gravity('Center')
              .extent(512, 512)
              .write(thumbFileName, error => {
                if (error != null) {
                  console.error(error)
                  reject(error)
                }

                thumbFileNames[base] = thumbFileName
                resolve(thumbFileName)
              })
          })
      )
    )
  } catch (err) {
    console.error(err)
  }

  return json$1(thumbFileNames)
}
