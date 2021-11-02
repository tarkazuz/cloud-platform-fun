const express = require('express')
const { STATUS_CODES } = require('http')

module.exports = ({ fortuneCookieService }) => {
  const app = express()

  app.get('/', async (req, res, next) => {
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

  app.use(({ stack }, req, res, next) => {
    console.error(stack)
    const code = 500
    res
      .status(code)
      .set('Content-Type', 'text/plain')
      .send(STATUS_CODES[code])
  })

  return app
}
