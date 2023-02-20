import pg from 'pg'

type Quote = {
  quote: string
}

export default class FortuneCookieService {

  constructor(private pool: pg.Pool) { }

  async quote() {
    const { rows: [{ quote }] } = await this.pool.query<Quote>('SELECT "quote" FROM "fortunes" ORDER BY random() LIMIT 1')
    return quote
  }
}
