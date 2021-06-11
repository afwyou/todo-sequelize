const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User//載入User model
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ where: { email } })//查詢特定email的user
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered!' })
        }
        return bcrypt.compare(password, user.password).then(isMatch => {
          if (!isMatch) {
            return done(null, false, { message: 'Email or Password incorrect.' })
          }
          return done(null, user)
        })
      })
      .catch(err => done(err, false))
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)//查詢特定id的User
      .then((user) => {
        user = user.toJSON()//物件轉化成plain object 回傳給req繼續使用於前端樣板
        done(null, user)
      }).catch(err => done(err, null))
  })
}