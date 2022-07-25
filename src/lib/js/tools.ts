import { onMount } from 'svelte'
import { sitename } from './globals'

export const setTitle = (title : String) => onMount(() => document.title = sitename + (title ? ` - ${title}` : ''))

export const disableScroll = () => document.body.style.overflow = 'hidden'
export const enableScroll  = () => document.body.style.overflow = 'visible'