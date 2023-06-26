import { promises as fs } from 'fs'

export const navItems = {
  Home: '/',
  'Art gallery': '/art',
  'Open Directory': '/files',
  Nextcloud: 'https://cloud.netdeneb.com/',
  Screemail: 'https://mail.screee.ee/',
  Other: {
    'Best website (archived)': '/other/yiff.toys',
    AAAAAA: '/leggy',
    'Source code': 'https://github.com/DenebTM/netdeneb',
  },
} satisfies Record<string, string | Record<string, string>>

const configPath = './config.json'

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
    return JSON.parse((await fs.readFile(configPath)).toString()) as AppConfig
  } catch (err) {
    return defaultConfig
  }
}
