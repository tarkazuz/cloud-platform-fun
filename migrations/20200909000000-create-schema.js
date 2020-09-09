exports.up = function (db, callback) {
    db.runSql('CREATE TABLE "fortunes" ("quote" TEXT)', callback);
};

exports.down = function (db, callback) {
    db.runSql('DROP TABLE "fortunes"', callback);
};
