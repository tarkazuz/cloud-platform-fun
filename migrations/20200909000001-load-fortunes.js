const { promises: fs } = require('fs')

exports.up = async (db) => {
  // REVISE a nice optimization might be to pipe the data using COPY FROM STDIN - main challenge are special chars in the quotes like single quote and newline
  const content = await fs.readFile('migrations/fortunes.txt')

  const quotes = content.toString().split(/(?:\r\n|\r|\n)~~~~~(?:\r\n|\r|\n)/)

  await Promise.all(quotes.map(quote => db.runSql('INSERT INTO "fortunes" ("quote") VALUES (?)', [quote])))
}

exports.down = async (db) => {
  await db.runSql('DELETE FROM "fortunes"')
}
