const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const { createHash, isValidPassword } = require('../helper/index')

const signUpStrategy = new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, done) => {
    console.log('asda')
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        console.log('Error in SignUp: ' + err)
        return done(err)
      }

      if (user) {
        console.log('User already exists')
        return done(null, false)
      }

      const newUser = {
        username: username,
        password: createHash(password)
      }

      User.create(newUser, (err, userWithId) => {
        if (err) {
          console.log('Error in Saving user: ' + err)
          return done(err)
        }
        console.log(user)
        console.log('User Registration succesful')
        return done(null, userWithId)
      })
    })
  }
)

const loginStrategy = new LocalStrategy((username, password, done) => {
  console.log('lOCAL STRATEGFY')
  User.findOne({ username }, (err, user) => {
    if (err) return done(err)

    if (!user) {
      console.log('User Not Found with username ' + username)
      return done(null, false)
    }

    if (!isValidPassword(user, password)) {
      console.log('Invalid Password')
      return done(null, false)
    }

    return done(null, user)
  })
})
module.exports = { loginStrategy, signUpStrategy }
