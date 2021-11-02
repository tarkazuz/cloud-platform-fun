module.exports = class FortuneCookieService {
  constructor ({ pool }) {
    this.pool = pool
  }

  async quote () {
    const { rows: [{ quote }] } = await this.pool.query('SELECT "quote" FROM "fortunes" ORDER BY random() LIMIT 1')
    return quote
  }
}
