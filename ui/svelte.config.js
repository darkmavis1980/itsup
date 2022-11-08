import sveltePreprocess from 'svelte-preprocess'

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  kit: {
    files: {
      routes: 'src/routes',
    },
  },
  preprocess: sveltePreprocess()
}
