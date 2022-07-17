import { onMount, tick } from 'svelte'
import { pagename } from './globals'
import { writable, type Writable } from "svelte/store"

export const setTitle = (title : String) => onMount(() => document.title = pagename + (title ? ` - ${title}` : ''))

import type { Subscriber } from 'svelte/store'

const navigatingStore : Writable<BoolString> = writable('false')
export const afterNavigation =
    (callback: Subscriber<BoolString>) => navigatingStore.subscribe(callback)

export const beginNavigation = () => navigatingStore.update(() => 'false')
export const finishNavigation = () => tick().then(() =>navigatingStore.update(() => 'true'))