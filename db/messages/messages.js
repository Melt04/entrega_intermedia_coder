const sqlite3Options = require("../options/sqlite3Options");
const knex = require("knex")(sqlite3Options);
const Contenedor = require("../../models/contenedor");
const message = new Contenedor("mensajes", knex);

module.exports = message;
