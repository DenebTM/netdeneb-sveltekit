import fs from 'node:fs/promises'
import { env } from '$env/dynamic/private'

const configPath = (): string => env.APP_CONFIG_PATH || './config.json'

export const defaultConfig: AppConfig = {
  artLocalBasePath: './art',
  artPublicBasePath: '/art',

  filesLocalBasePath: './files',
  filesPublicBasePath: '/getfile',
  excludeFiles: ['Thumbs.db'],

  sessionListPath: './sessions.txt',
  userListPath: './users.json',
  socialsPath: './socials.json',
}

export const getConfig = async (): Promise<AppConfig> => {
  try {
    return JSON.parse((await fs.readFile(configPath())).toString()) as AppConfig
  } catch (err) {
    return defaultConfig
  }
}
