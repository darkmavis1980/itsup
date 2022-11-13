import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  kit: {
    // adapter: adapter({ out: 'build' })
    paths: {
      base: '/ui'
    },
    adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: 'index.html'
		}),
  },
  preprocess: sveltePreprocess()
}
