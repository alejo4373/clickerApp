var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/clicker_app_db";
var db = pgp(connectionString);

module.exports = db;
