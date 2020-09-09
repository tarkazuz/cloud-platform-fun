'use strict';

const { Pool } = require('pg');
const DBMigrate = require('db-migrate');

class FortuneCookieService {

    constructor(config) {
        this.pool = new Pool(config);
        const migrateCfg = { env: 'default', config: { default: { driver: 'pg', ...config } } };
        const migrate = DBMigrate.getInstance(true, migrateCfg)
        this.ready = migrate.reset().then(() => {
            return migrate.up();
        });
    }

    async quote() {
        await this.ready;
        console.log('before')
        try {
            const result = await this.pool.query('SELECT "quote" FROM "fortunes" ORDER BY random() LIMIT 1');
            console.log('after');
            return result.rows[0].quote;
        } catch (error) {
            console.log(error);
        }
    }

    async stop() {
        await this.pool.end();
    }
}

module.exports = FortuneCookieService;
