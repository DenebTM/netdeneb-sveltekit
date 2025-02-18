import fs from 'node:fs/promises'
import { env } from '$env/dynamic/private'

/* eslint-disable-next-line
   @typescript-eslint/prefer-nullish-coalescing
   ---
   if the envar is present but empty, it should be ignored
*/
const configPath = (): string => env.APP_CONFIG_PATH || './config/config.json'

export const defaultConfig: AppConfig = {
  artBasePath: './art',
  artBaseURL: '/art',
}

export let appConfig: AppConfig = defaultConfig

try {
  appConfig = JSON.parse(
    (await fs.readFile(configPath())).toString()
  ) as AppConfig
} catch (err) {
  if (env.APP_CONFIG_PATH) console.error('Error reading config:', err)
}
