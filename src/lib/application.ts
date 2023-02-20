import express, { ErrorRequestHandler } from 'express'
import { STATUS_CODES } from 'http'
import FortuneCookieService from './fortune-cookie-service.js'

type Empty = Record<string, never>

export default (fortuneCookieService: FortuneCookieService) => {
  const app = express()

  app.get<Empty, string>('/', async (req, res, next) => {
    try {
      const quote = await fortuneCookieService.quote()
      res
        .status(200)
        .set('Content-Type', 'text/plain')
        .send(quote)
    } catch (error) {
      next(error)
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const errorHandler: ErrorRequestHandler = (({ stack }, req, res, next) => {
    console.error(stack)
    const code = 500
    res
      .status(code)
      .set('Content-Type', 'text/plain')
      .send(STATUS_CODES[code])
  })
  app.use(errorHandler)

  return app
}
