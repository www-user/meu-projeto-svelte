import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig({
	plugins: [
		sveltekit(),
		basicSsl()
	],
	server: {
		// Fixa a porta de desenvolvimento para 5174
		port: 5174
	}
});