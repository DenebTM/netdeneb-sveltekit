import { onMount, tick } from 'svelte'
import { pagename } from './globals'
import { writable } from "svelte/store"

export const setTitle = (title : String) => onMount(() => document.title = pagename + (title ? ` - ${title}` : ''))

import type { Subscriber } from 'svelte/store'

const navigatingStore = writable(true)
export const afterNavigation =
    (callback: Subscriber<boolean>) => navigatingStore.subscribe(callback)

export const beginNavigation = () => navigatingStore.update(() => true)
export const finishNavigation = () => tick().then(() =>navigatingStore.update(() => false))