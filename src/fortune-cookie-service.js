'use strict';

const { Pool } = require('pg');
const DBMigrate = require('db-migrate');

class FortuneCookieService {

    constructor(config) {
        this.pool = new Pool(config);
        const migrateCfg = { env: 'default', config: { default: { driver: 'pg', ...config } } };
        this.ready = DBMigrate.getInstance(true, migrateCfg).up().catch(error => {
            console.log('Failed to run migration: ' + error);
            process.exit(1);
       });
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
