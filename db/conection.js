const Contenedor = require("../models/contenedor");
const mariaDBOptions = require("../db/options/mariaDBOptions");
const sqlite3Options = require("../db/options/sqlite3Options");
const products = new Contenedor("productos", mariaDBOptions);
const message = new Contenedor("mensajes", sqlite3Options);

module.exports = { products, message };
