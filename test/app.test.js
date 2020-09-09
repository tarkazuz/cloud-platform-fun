'use strict';

const assert = require('assert');
const supertest = require('supertest');
const createApp = require('../src/app');
const FortuneCookieService = require('../src/fortune-cookie-service');

describe('fortune cookie app', function () {

    it('responds with a random quote on root URL', async function () {
        this.timeout(5000);

        const service = new FortuneCookieService('postgres://postgres@localhost/postgres');
        try {
            const client = supertest(createApp(service));
            const response = await client.get('/').expect(200).expect('content-type', /text\/plain/);
            assert.notEqual(response.text, '');
        } finally {
            await service.stop();
        }
    });

});
