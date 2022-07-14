import { onMount } from 'svelte';
import { pagename } from './globals';

export const setTitle = (title : String) => onMount(() => document.title = pagename + (title ? ` - ${title}` : ''))