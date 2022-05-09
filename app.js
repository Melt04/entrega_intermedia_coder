const createError = require("http-errors")
const express = require("express")
const path = require("path")
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const routerProducts = require("./routes/products")
const routerProductTest = require('./routes/product-test')
const { isAuthMiddleware, authPublicDirectory } = require('./middleware')
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(cookieParser())

app.use(session({
  secret: 'my secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 4,
  }
}))


app.use(authPublicDirectory, express.static(path.join(__dirname, "public")))

/* app.use('/api/testcookie', isAuthMiddleware, (req, res) => {
  res.json(req.session)
}) */

app.get('/', function (req, res) {
  if (req.session.name) {
    return res.sendFile("main.html", { root: "public" });
  }
  return res.sendFile("login.html", { root: "public" })
});
app.use("/api/products-test", routerProductTest)
app.get("/api/getPlantilla", (req, res) => {
  res.sendFile("public/plantilla/productos.hbs", { root: __dirname })
})
app.post("/api/session", (req, res) => {

  req.session.name = req.body.name
  return res.redirect("/main.html")
})
app.use("/api/products", routerProducts)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.originalUrl != '/http') {
    next(createError(404))
  }


})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}
  res.status(err.status || 500)
  res.send("Page Not Found")
})

module.exports = app

