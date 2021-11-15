const dbmigrate = require('db-migrate')
const { postgres } = require('./config')

const migrate = async () => {
  try {
    const [action, ...args] = process.argv.slice(2)

    const dbm = dbmigrate.getInstance(true, {
      env: 'default',
      config: {
        default: {
          driver: 'pg',
          ...postgres
        }
      }
    })

    await dbm[action](...args)
  } catch (error) {
    console.error(error.stack)
    process.exit(1)
  }
}

migrate()
