/// <reference types="@sveltejs/kit" />

type ArtItem = {
	fileName: string,
	full: string,
	description: string,
	artistLink: string,
	width: string,
	height: string
}
type ArtList = Array<ArtItem>

type FileDirList = {
    dirList: Array<string>,
    fileList: Array<string>,
    availableThumbs: Record<string, string>,
    error: string | undefined
}

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		token: string
	}
}

declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
        show?: BoolString
    }
	interface Headers {
		cookie: Record<string, string>
	}
}

declare module '@fortawesome/free-solid-svg-icons/index.es' {
	export * from '@fortawesome/free-solid-svg-icons'
}

declare module '@fortawesome/free-brands-svg-icons/index.es' {
	export * from '@fortawesome/free-brands-svg-icons'
}

declare module 'svelte-image-gallery'