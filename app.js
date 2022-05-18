const createError = require('http-errors')
const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')
const cookieParser = require('cookie-parser')
const routerProducts = require('./routes/products')
const routerSession = require('./routes/session')
const routerProductTest = require('./routes/product-test')
const mainRouter = require('./routes/main')
const mongoStore = require('connect-mongo')
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const dotenv = require('dotenv')
const passport = require('passport')

const { loginStrategy, signUpStrategy } = require('./authStrategy/index')

const User = require('./models/User')

dotenv.config()

passport.use('signup', signUpStrategy)
passport.use('login', loginStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vrmey.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      mongoOptions: mongoOptions
    }),
    secret: 'my secret',
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 10
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
  })
)
app.use(passport.initialize())
app.use(passport.session())
app.use('/', mainRouter)
app.use('/api/products-test', routerProductTest)
app.get('/api/getPlantilla', (req, res) => {
  res.sendFile('public/plantilla/productos.hbs', { root: __dirname })
})
app.use('/api/session', routerSession)

app.use('/api/products', routerProducts)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  if (req.originalUrl != '/http') {
    if (req.isAuthenticated()) {
      return res.redirect('/products')
    }
    return res.redirect('/login')
  }
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  console.log(err.message)
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('Page Not Found')
})

module.exports = app
