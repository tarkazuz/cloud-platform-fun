// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dbmigrate from 'db-migrate'
import config from './config.js'

const migrate = async () => {
  try {
    const [action, ...args] = process.argv.slice(2)

    const dbm = dbmigrate.getInstance(true, {
      env: 'default',
      config: {
        default: {
          driver: 'pg',
          ...config.postgres
        }
      }
    })

    await dbm[action](...args)
  } catch (error) {
    console.error((error as Error).stack)
    process.exit(1)
  }
}

migrate()
