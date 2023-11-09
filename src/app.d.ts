import 'svelte'

declare global {
  interface ArtItem {
    id: string
    fileName: string
    full: string
    description: string
    artistLink: string
  }
  interface ArtItemWithMetadata extends ArtItem {
    width: number
    height: number
    mime: string
  }
  type ArtList = ArtItemWithMetadata[]

  interface FileDirList {
    dirList: string[]
    fileList: string[]
    availableThumbs: Record<string, string>
    error: string | undefined
  }

  interface SocialItem {
    icon: string
    href: string
    text: string
  }
  type SociaList = SocialItem[]

  interface AppConfig {
    artBasePath: string
    artBaseURL: string

    filesBasePath: string
    filesBaseURL: string
    thumbsBasePath: string
    thumbsBaseURL: string
    excludeFiles: string[]

    sessionListPath: string
    userListPath: string
    socialsPath: string
    navPath: string
  }

  // See https://kit.svelte.dev/docs/types#app
  // for information about these interfaces
  // and what to do when importing types
  declare namespace App {
    interface Locals {
      token: string
    }
  }

  declare namespace svelteHTML {
    interface HTMLAttributes {
      animate?: BoolString
      open?: boolean
    }
    interface Headers {
      cookie: Record<string, string>
    }
  }
}
