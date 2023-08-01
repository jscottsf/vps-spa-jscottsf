import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr/server'
import Pino from 'pino'

const isProduction = process.env.NODE_ENV === 'production'
const __dirname = dirname(fileURLToPath(import.meta.url))
const root = `${__dirname}/../..`
const logger = Pino(
  isProduction
    ? {
        level: process.env.LOGLEVEL || 'info'
      }
    : {
        level: process.env.LOGLEVEL || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        }
      }
)

startServer()

async function startServer() {
  const app = express()
  const host = process.env.HOST
  const port = process.env.PORT ?? 3000

  app.use(compression())

  if (isProduction) {
    const sirv = await import('sirv')
    app.use(sirv.default(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
    const viteDevMiddlewares = (
      await vite.createServer({
        root,
        server: {
          middlewareMode: true
        }
      })
    ).middlewares
    app.use(viteDevMiddlewares)
  }

  app.get('*', async (req, res) => {
    const pageContextInit = {
      urlOriginal: req.originalUrl
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext

    if (!httpResponse) {
      res.status(404).send('404: Page not found')
    } else {
      res.status(httpResponse.statusCode).type(httpResponse.contentType)
      httpResponse.pipe(res)
    }
  })

  if (host) app.listen(+port, host)
  else app.listen(port)

  logger.info(`Server running at http://${host || 'localhost'}:${port}`)
}
