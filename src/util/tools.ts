import { onMount } from 'svelte'
import { sitename } from './globals'

export const setTitle = (title: string): void => {
  onMount(() => (document.title = sitename + (title ? ` - ${title}` : '')))
}

export const disableScroll = (): void => {
  document.body.style.overflow = 'hidden'
}

export const enableScroll = (): void => {
  document.body.style.overflow = 'visible'
}
