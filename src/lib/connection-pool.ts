import pg from 'pg'

export default (config: pg.PoolConfig) => {
  const pool = new pg.Pool(config)

  pool.on('connect', () => console.info('pool connected'))
  pool.on('remove', () => console.info('pool disconnected'))
  pool.on('error', ({ message }) => console.error(`pool error: ${message}`))

  return pool
}
