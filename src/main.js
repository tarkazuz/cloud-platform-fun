const connectionPool = require('./connection-pool')
const application = require('./application')
const FortuneCookieService = require('./fortune-cookie-service')

const { env: { PORT: port = 3000, PG_CONNECTION_STRING: connectionString } } = process

const pool = connectionPool({ connectionString })

const fortuneCookieService = new FortuneCookieService({
  pool
})

const app = application({ fortuneCookieService })

app
  .listen(port, () => console.info(`app is listening on port ${port}`))
  .on('error', ({ stack }) => console.error(stack))
