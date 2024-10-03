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

  interface SocialItem {
    platform: string
    showPlatformAlways?: boolean
    icon: string
    href: string
    text: string
  }
  type SociaList = SocialItem[]

  interface InfoJson {
    titleImage: {
      path: string
      description: string
    }
    socials: SociaList
  }

  interface AppConfig {
    artBasePath: string
    artBaseURL: string

    filesBasePath: string
    thumbsBasePath: string
    thumbsBaseURL: string

    infoJsonPath: string
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
      isCurrent?: boolean
    }
    interface Headers {
      cookie: Record<string, string>
    }
  }
}
