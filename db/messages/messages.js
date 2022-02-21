const Contenedor = require("../../models/contenedor");
const sqlite3Options = require("../options/sqlite3Options");
const message = new Contenedor("mensajes", sqlite3Options);

module.exports = message;
