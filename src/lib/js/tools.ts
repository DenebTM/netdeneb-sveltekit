import { onMount/* , tick */ } from 'svelte'
import { sitename } from './globals'

export const setTitle = (title : String) => onMount(() => document.title = sitename + (title ? ` - ${title}` : ''))
