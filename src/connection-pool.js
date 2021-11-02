const { Pool } = require('pg')

module.exports = options => {
  const pool = new Pool(options)

  pool.on('connect', () => console.info('pool connected'))
  pool.on('remove', () => console.info('pool disconnected'))
  pool.on('error', ({ message }) => console.error(`pool error: ${message}`))

  return pool
}
