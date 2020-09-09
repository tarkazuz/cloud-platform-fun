'use strict';

const { Pool } = require('pg');
const DBMigrate = require('db-migrate');

class FortuneCookieService {

    constructor(uri) {
        this.pool = new Pool({ connectionString: uri });
        const migrateCfg = { env: 'default', config: { default: uri } };
        this.ready = DBMigrate.getInstance(true, migrateCfg).up();
    }

    async quote() {
        await this.ready;
        const result = await this.pool.query('SELECT "quote" FROM "fortunes" ORDER BY random() LIMIT 1');
        return result.rows[0].quote;
    }

    async stop() {
        await this.pool.end();
    }
}

module.exports = FortuneCookieService;
