import 'svelte'

declare global {
  type NavItem = string | { href: string; external: boolean }
  // TODO: fix this type
  // type Navigation = Record<string, NavItem | Record<string, NavItem>>
  type Navigation = Record<string, NavItem>

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
    socials: SociaList
  }

  interface ButtonData {
    href: string | null
    img: string | null
    alt: string
  }

  interface Buttons {
    general: ButtonData[]
    webFriends: ButtonData[]
    webMisc: ButtonData[]
  }

  interface SiteMetadata {
    name: string
    description: string
    titleImage: {
      path: string
      description: string
    }
  }

  interface AppConfig {
    siteMetadata: SiteMetadata

    artBasePath: string
    artBaseURL: string

    filesBasePath: string
    thumbsBasePath: string
    thumbsBaseURL: string
  }

  // See https://kit.svelte.dev/docs/types#app
  // for information about these interfaces
  // and what to do when importing types
  declare namespace App {
    interface PageData {
      siteMetadata: SiteMetadata
    }
  }

  declare namespace svelteHTML {
    interface HTMLAttributes {
      animate?: BoolString
      isopen?: boolean
      isCurrent?: boolean
    }
    interface Headers {
      cookie: Record<string, string>
    }
  }
}

export {}
