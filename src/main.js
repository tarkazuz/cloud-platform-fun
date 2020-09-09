'use strict';

const createApp = require('./app');
const FortuneCookieService = require('./fortune-cookie-service');

//TODO get URI from environment instead
const uri = 'postgres://postgres@localhost/postgres';

createApp(new FortuneCookieService(uri)).listen(process.env.PORT || 3000);
