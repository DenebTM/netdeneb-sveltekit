import fs from 'node:fs/promises'
import { env } from '$env/dynamic/private'

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
const configPath = (): string => env.APP_CONFIG_PATH || './config.json'

export const defaultConfig: AppConfig = {
  artBasePath: './art',
  artBaseURL: '/art',

  filesBasePath: './files',
  thumbsBasePath: './thumbs',
  thumbsBaseURL: '/thumbs',

  socialsPath: './socials.json',
  navPath: './nav.json',
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
    } catch (err: any) {
      if (env.APP_CONFIG_PATH) console.error('Error reading config:', err)
    }
  }

  return config
}
