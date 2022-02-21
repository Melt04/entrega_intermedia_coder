const mariaDBOptions = require("../options/mariaDBOptions");
const knex = require("knex")(mariaDBOptions);
const Contenedor = require("../../models/contenedor");
const products = new Contenedor("productos", knex);
module.exports = products;
