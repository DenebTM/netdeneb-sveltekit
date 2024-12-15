import fs from 'node:fs/promises'
import { env } from '$env/dynamic/private'

/* eslint-disable-next-line
   @typescript-eslint/prefer-nullish-coalescing
   ---
   if the envar is present but empty, it should be ignored
*/
const configPath = (): string => env.APP_CONFIG_PATH || './config/config.json'

export const defaultConfig: AppConfig = {
  siteMetadata: {
    name: 'netdeneb.com',
    description: "deneb's homepage",
    titleImage: {
      'path': '/img/deneb1.webp',
      'description': 'art of deneb, by twitter.com/FluffySakora',
    },
  },

  artBasePath: './art',
  artBaseURL: '/art',

  filesBasePath: './files',
  thumbsBasePath: './thumbs',
  thumbsBaseURL: '/thumbs',

  infoJsonPath: './config/info.json',
  navPath: './config/nav.json',
  friendlinksPath: './config/friendlinks.json',
}

let config: AppConfig = defaultConfig
let configLastRead = new Date(0)

export const getConfig = async (): Promise<AppConfig> => {
  const now = new Date()
  const diffSeconds = (now.getTime() - configLastRead.getTime()) / 1000

  if (diffSeconds >= 60) {
    try {
      config = JSON.parse(
        (await fs.readFile(configPath())).toString()
      ) as AppConfig
      configLastRead = now
    } catch (err) {
      if (env.APP_CONFIG_PATH) console.error('Error reading config:', err)
    }
  }

  return config
}
