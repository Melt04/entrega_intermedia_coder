const createError = require('http-errors')
const express = require('express')
const path = require('path')
const app = express()
const session = require('express-session')

const routerProducts = require('./routes/products')
const routerSession = require('./routes/session')
const routerProductTest = require('./routes/product-test')
const mainRouter = require('./routes/main')
const randomRouter = require('./routes/random')
const mongoStore = require('connect-mongo')
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const dotenv = require('dotenv')
const passport = require('passport')
const winston = require('winston')
const logger = winston.createLogger({
  level: 'warn',
  transports: [
    new winston.transports.Console({ level: 'verbose' }),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'warn.log', level: 'warn' })
  ]
})

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
app.use((req, res, next) => {
  logger.log('info', `Path  ${req.originalUrl}, Methodo ${req.method}`)
  next()
})
app.use('/', mainRouter)
app.use('/api/random', randomRouter)
app.use('/api/products-test', routerProductTest)
app.get('/api/getPlantilla', (req, res) => {
  res.sendFile('public/plantilla/productos.hbs', { root: __dirname })
})
app.use('/api/session', routerSession)

app.use('/api/products', routerProducts)
app.use(function (req, res, next) {
  console.log('2')
  if (req.originalUrl != '/http') {
    logger.log('warn', `Ruta inexistente ${req.originalUrl}`)
    if (req.isAuthenticated()) {
      return res.redirect('/products')
    }
    return res.redirect('/login')
  }
})

app.use(function (err, req, res, next) {
  console.log('here')
  res.locals.message = err.message
  logger.log('error', err).message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('Page Not Found')
})

module.exports = app
