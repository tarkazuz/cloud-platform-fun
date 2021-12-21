import assert from 'assert/strict'
import supertest from 'supertest'

import connectionPool from '../lib/connection-pool.js'
import application from '../lib/application.js'
import FortuneCookieService from '../lib/fortune-cookie-service.js'
import config from '../lib/config.js'

const { postgres: { connectionString } } = config

describe('fortune cookie app', () => {
  let pool = null
  let client = null

  before(() => {
    pool = connectionPool({
      connectionString
    })
  })

  after(async () => {
    await pool.end()
  })

  beforeEach(() => {
    const fortuneCookieService = new FortuneCookieService(pool)
    const app = application(fortuneCookieService)
    client = supertest(app)
  })

  it('should respond with a random quote on root URL', async () => {
    const response =
      await client
        .get('/')
        .expect(200)
        .expect('content-type', /text\/plain/)
    assert.notEqual(response.text, '')
  })
})
