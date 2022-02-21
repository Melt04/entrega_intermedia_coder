const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

const routerProducts = require("./routes/products");

/* const Contenedor = require("./models/contenedor");
const mariaDBOptions = require("./db/options/mariaDBOptions");
const sqlite3Options = require("./db/options/sqlite3Options");
const { createTableMessage, createTableProducts } = require("./db/helper");
createTableProducts(knex(mariaDBOptions));
createTableMessage(knex(sqlite3Options));
const products = new Contenedor("productos", mariaDBOptions);
const message = new Contenedor("mensajes", sqlite3Options); */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/api/getPlantilla", (req, res) => {
  res.sendFile("public/plantilla/productos.hbs", { root: __dirname });
});
app.use("/api/products", routerProducts);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  console.log(err);
  res.send("Page Not Found");
});

module.exports = app;
