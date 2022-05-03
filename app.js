const createError = require("http-errors");
const express = require("express");
const path = require("path");
const app = express();

const routerProducts = require("./routes/products");
const routerProductTest = require('./routes/product-test')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/products-test", routerProductTest)
app.get("/api/getPlantilla", (req, res) => {
  res.sendFile("public/plantilla/productos.hbs", { root: __dirname });
});
app.use("/api/products", routerProducts);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.originalUrl != '/http') {

    next(createError(404));
  }


});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send("Page Not Found");
});

module.exports = app;
