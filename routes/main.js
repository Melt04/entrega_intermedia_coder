const express = require('express')
const router = express.Router()
const passport = require('passport')
const yarg = require('yargs/yargs')(process.argv.slice(2))
const compression = require('compression')

router.get('/info', compression(), (req, res) => {
  const so = process.platform
  const argv = yarg.argv
  const argvkeys = Object.keys(argv)
  const arg = argvkeys.map(key => {
    return argv[key]
  })
  const version = process.version
  const path = process.execPath
  const pid = process.pid
  const folder = process.cwd()
  const { rss: memory } = process.memoryUsage()
  const numCpus = require('os').cpus().length

  res.render('info.hbs', {
    so,
    arg,
    version,
    path,
    pid,
    folder,
    memory,
    numCpus
  })
})
router.get('/faillogin', (req, res) => {
  res.render('error.hbs', { error: 'LOGIN' })
})
router.get('/failregister', (req, res) => {
  res.render('error.hbs', { error: 'REGISTER' })
})
router.get('/register', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('public', { user: req.user.username })
  }

  return res.render('register')
})
router.post(
  '/register',
  passport.authenticate('signup', { failureRedirect: '/failregister' }),
  (req, res) => {
    return res.render('register')
  }
)

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) {
    return res.render('public', { user: req.user.username })
  }
  return res.render('login')
})
router.post(
  '/products',
  passport.authenticate('login', {
    failureRedirect: '/faillogin'
  }),
  (req, res) => {
    res.render('public', { user: req.user.username })
  }
)
router.get('/products', (req, res, next) => {
  return res.render('public', { user: req.user.username })
})

module.exports = router
