import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // ATENÇÃO: A opção 'runes' deve estar no nível raiz, fora do objeto 'kit'.
  runes: true,

  kit: {
    adapter: adapter(),
  },

  preprocess: vitePreprocess()
};

export default config;