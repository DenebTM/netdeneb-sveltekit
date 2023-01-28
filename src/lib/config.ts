const navItems: Record<string, any> = {
  Home: '/',
  'Art gallery': '/art',
  'Public files': '/ftpdir',
  Nextcloud: 'https://cloud.netdeneb.com/',
  Screemail: 'https://mail.screee.ee/',
  Other: {
    'Best website (archived)': '/other/yiff.toys',
    AAAAAA: '/leggy',
    'Source code': 'https://github.com/DenebTM/netdeneb',
  },
}
export { navItems }

export const artPrivateBase = '/art'
export const artPublicBase = '/art'

export const filesBase = '/files'
export const excludeFiles = ['Thumbs.db']

export const sessionListPath = '/sessions.txt'
