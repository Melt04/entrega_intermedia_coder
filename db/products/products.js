const Contenedor = require("../../models/contenedor");
const mariaDBOptions = require("../options/mariaDBOptions");
const products = new Contenedor("productos", mariaDBOptions);

module.exports = products;
