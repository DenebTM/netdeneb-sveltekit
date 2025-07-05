import adapter from '@sveltejs/adapter-static'
import { sveltePreprocess } from 'svelte-preprocess'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess(),
  kit: {
    adapter: adapter(),
    prerender: { handleHttpError: 'fail', handleMissingId: 'fail' },
    alias: { '~/*': './src/*', '$lib': './src/lib/*' },
  },
}

export default config
