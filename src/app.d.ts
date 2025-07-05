import 'svelte'

declare global {
  interface NavItemBase {
    title: string
  }
  interface NavTarget extends NavItemBase {
    href: string
    external?: boolean
  }
  interface NavDropdown extends NavItemBase {
    items: NavTarget[]
  }
  type NavItem = NavTarget | NavDropdown
  type Navigation = NavItem[]

  interface ArtItem {
    id: string
    fileName: string
    full: string
    description: string
    artistLink: string
  }
  type ArtList = ArtItem[]
  interface ArtItemWithMetadata extends ArtItem {
    width: number
    height: number
    mime: string
  }

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
    titleImage: { path: string; description: string }
  }

  interface AppConfig {
    artBasePath: string
    artBaseURL: string
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
