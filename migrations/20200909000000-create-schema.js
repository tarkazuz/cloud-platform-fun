exports.up = async function (db) {
  await db.runSql('CREATE TABLE "fortunes" ("quote" TEXT)')
}

exports.down = async function (db) {
  await db.runSql('DROP TABLE "fortunes"')
}
