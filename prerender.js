import { prerender } from 'vite-plugin-ssr/prerender'
import Pino from 'pino'

const logger = Pino({
  level: 'info'
})
const sitemap = {
  base: '',
  links: []
}

// SEE: https://github.com/brillout/vite-plugin-ssr/issues/49
// SEE: https://github.com/ekalinin/sitemap.js
// SEE: https://www.sitemaps.org/protocol.html
async function afterPrerender() {
  logger.info('Prerender done!')
}

logger.info('Prerender starting...')

prerender({
  pageContextInit: {
    sitemap
  }
}).then(afterPrerender)
