import { Readable } from 'node:stream'
import { renderToNodeStream } from '@vue/server-renderer'
import { escapeInject } from 'vite-plugin-ssr/server'
import { createPageApp } from './app'
import { getCustomProps } from './getCustomProps'
import { logger } from '#root/lib/log'

export default onRenderHtml

async function onRenderHtml(pageContext) {
  let stream
  if (!pageContext.Page) {
    stream = Readable.from([''])
  } else {
    const app = createPageApp(pageContext)
    stream = renderToNodeStream(app)
  }
  const customProps = getCustomProps(pageContext)
  const { canonicalPaths } = customProps

  logger.info('Rendering document %s', canonicalPaths.relative)

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="application-name" content="The App" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The App</title>
      </head>
      <body>
        <div id="app">${stream}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      ...customProps,
      enableEagerStreaming: true
    }
  }
}
