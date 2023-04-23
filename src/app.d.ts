import 'svelte'

declare global {
  interface ArtItem {
    fileName: string
    full: string
    description: string
    artistLink: string
    width: string
    height: string
  }
  type ArtList = ArtItem[]

  interface FileDirList {
    dirList: string[]
    fileList: string[]
    availableThumbs: Record<string, string>
    error: string | undefined
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
