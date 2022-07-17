import { onMount/* , tick */ } from 'svelte'
import { sitename } from './globals'
// import { writable, type Writable } from "svelte/store"
// import type { Subscriber } from 'svelte/store'

export const setTitle = (title : String) => onMount(() => document.title = sitename + (title ? ` - ${title}` : ''))

// const navigatingStore : Writable<BoolString> = writable('false')
// export const afterNavigation =
//     (callback: Subscriber<BoolString>) => navigatingStore.subscribe(callback)

// export const beginNavigation = () => navigatingStore.update(() => 'false')
// export const finishNavigation = () => tick().then(() =>navigatingStore.update(() => 'true'))