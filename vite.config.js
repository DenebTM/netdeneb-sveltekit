import { sveltekit } from '@sveltejs/kit/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	ssr: {
		// svelte-kit build fails without this
		noExternal: [
			'@fortawesome/free-solid-svg-icons',
			'@fortawesome/free-brands-svg-icons'
		]
	},
	server: {
		port: 3000
	},
	preview: {
		port: 3000
	}
}

export default config