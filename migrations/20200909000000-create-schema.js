exports.up = async (db) => {
  await db.runSql('CREATE TABLE "fortunes" ("quote" TEXT)')
}

exports.down = async (db) => {
  await db.runSql('DROP TABLE "fortunes"')
}
