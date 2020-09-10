'use strict';

const createApp = require('./app');
const FortuneCookieService = require('./fortune-cookie-service');

const connectionString = process.env.DB_CONNECTION_STRING;

const config = {
    connectionString: connectionString || 'postgres://postgres@localhost/postgres'
};

createApp(new FortuneCookieService(config)).listen(process.env.PORT || 3000);
