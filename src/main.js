const connectionPool = require('./connection-pool')
const application = require('./application')
const FortuneCookieService = require('./fortune-cookie-service')

const { postgres, app: { port } } = require('./config')

const pool = connectionPool(postgres)

const fortuneCookieService = new FortuneCookieService({
  pool
})

const app = application({ fortuneCookieService })

app
  .listen(port, () => console.info(`app is listening on port ${port}`))
  .on('error', ({ stack }) => console.error(stack))
