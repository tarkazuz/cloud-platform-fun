'use strict';

const express = require('express');

const create = function (fortuneCookieService) {
    return express().get('/', async function (req, res) {
        const quote = await fortuneCookieService.quote();
        res.set('Content-Type', 'text/plain').send(quote);
    });
};

module.exports = create;
