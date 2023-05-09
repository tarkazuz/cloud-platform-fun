const {
  PORT: port = 3000,
  PG_CONNECTION_STRING: connectionString = 'postgresql://postgres:postgres@localhost:5432/postgres'
} = process.env

export default {
  app: {
    port
  },
  postgres: {
    connectionString
  }
}
