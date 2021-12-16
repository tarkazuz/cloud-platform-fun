import connectionPool from './connection-pool.js'
import application from './application.js'
import FortuneCookieService from './fortune-cookie-service.js'
import config from './config.js'

const {postgres, app: {port}} = config

const pool = connectionPool(postgres)

const fortuneCookieService = new FortuneCookieService(pool)

const app = application(fortuneCookieService)

app
  .listen(port, () => console.info(`app is listening on port ${port}`))
  .on('error', ({stack}) => console.error(stack))
