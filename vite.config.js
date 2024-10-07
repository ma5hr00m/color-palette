import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    svelte(),
    Unocss(),
  ],
})
