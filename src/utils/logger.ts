import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Define o nível de log
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `${timestamp} [${level}]: ${message} - ${stack}`
            : `${timestamp} [${level}]: ${message}`
        })
      ),
    }),
  ],
})

export default logger