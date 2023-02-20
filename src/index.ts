import connectionPool from './lib/connection-pool.js'
import application from './lib/application.js'
import FortuneCookieService from './lib/fortune-cookie-service.js'
import config from './lib/config.js'

const { postgres, app: { port } } = config

const pool = connectionPool(postgres)

const fortuneCookieService = new FortuneCookieService(pool)

const app = application(fortuneCookieService)

app
  .listen(port, () => console.info(`app is listening on port ${port}`))
  .on('error', ({ stack }: Error) => console.error(stack))
