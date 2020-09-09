'use strict';

const fs = require('fs').promises;

exports.up = async function (db) {
    //REVISE a nice optimization might be to pipe the data using COPY FROM STDIN - main challenge are special chars in the quotes like single quote and newline
    const content = await fs.readFile('migrations/fortunes.txt');
    const quotes = content.toString().split('\n~~~~~\n');

    let allInserts = [];
    quotes.forEach((quote) => {
        allInserts.push(db.runSql('INSERT INTO "fortunes" ("quote") VALUES (?)', [quote]));
    });

    return Promise.all(allInserts);
};

exports.down = function (db, callback) {
    db.runSql('DELETE FROM "fortunes"', callback);
};
