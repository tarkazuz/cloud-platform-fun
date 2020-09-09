'use strict';

const createApp = require('./app');
const FortuneCookieService = require('./fortune-cookie-service');
const cfenv = require('cfenv');

const creds = cfenv.getAppEnv().getServiceCreds('test-db');
const config = {
    connectionString: creds.uri,
    ssl: {
        cert: creds.sslcert,
        ca: creds.sslrootcert
    }
};

createApp(new FortuneCookieService(config)).listen(process.env.PORT || 3000);
