import Pino from 'pino'

export const logger = !import.meta.env.SSR
  ? Pino({
      browser: { asObject: true },
      level: import.meta.env.VITE_LOG_LEVEL || 'info'
    })
  : import.meta.env.VITE_LOG_PRETTY === 'true'
  ? Pino({
      level: import.meta.env.VITE_LOG_LEVEL || 'info',
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      }
    })
  : Pino({
      level: import.meta.env.VITE_LOG_LEVEL || 'info'
    })
