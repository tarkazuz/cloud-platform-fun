const assert = require('assert')
const supertest = require('supertest')

const connectionPool = require('../src/connection-pool')
const application = require('../src/application')
const FortuneCookieService = require('../src/fortune-cookie-service')

describe('fortune cookie app', function () {
  let pool = null

  let client = null

  before(function () {
    const { env: { PG_CONNECTION_STRING: connectionString } } = process
    pool = connectionPool({
      connectionString
    })
  })

  after(async function () {
    await pool.end()
    pool = null
  })

  beforeEach(function () {
    const fortuneCookieService = new FortuneCookieService({
      pool
    })
    const app = application({ fortuneCookieService })
    client = supertest(app)
  })

  this.afterEach(function () {
    client = null
  })

  it('should respond with a random quote on root URL', async function () {
    const response =
      await client
        .get('/')
        .expect(200)
        .expect('content-type', /text\/plain/)
    assert.notStrictEqual(response.text, '')
  })
})
