import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
// https://vite-plugin-checker.netlify.app
import checker from 'vite-plugin-checker'
// https://github.com/brillout/vite-plugin-ssr
import ssr from 'vite-plugin-ssr/plugin'
// https://github.com/vitejs/vite/tree/main/packages/plugin-vue#readme
import vue from '@vitejs/plugin-vue'
// https://github.com/antfu/unplugin-vue-components
import Components from 'unplugin-vue-components/vite'
import { Vuetify3Resolver } from 'unplugin-vue-components/resolvers'
// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'

const envConfig = process.env.NODE_ENV === 'production' ? {} : {}
const isPrerender = process.argv[1].endsWith('/prerender.js')

const plugins = [
	vue(),
	vuetify({
		autoImport: true
	}),
	Components({
		resolvers: [Vuetify3Resolver()]
	}),
	ssr({
		includeAssetsImportedByServer: true,
		prerender: {
			disableAutoRun: true
		}
	})
]

if (!isPrerender)
	plugins.push(
		checker({
			eslint: {
				lintCommand: 'eslint "./src/**/*.{js,ts,tsx,vue}"'
			}
		})
	)

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		assetsInlineLimit: 256
	},

	plugins,

	resolve: {
		alias: {
			'#root': path.resolve('./src')
		}
	},

	ssr: { noExternal: ['vuetify'] },

	...envConfig
})
