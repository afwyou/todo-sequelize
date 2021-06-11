const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcrypt')

const db = require('../../models')
const Todo = db.Todo//資料庫設定的表格名稱是Todo，但在資料庫會是Todos，設定檔名稱是todo.js
const User = db.User

router.get('/users/login', (req, res) => {
  res.render('login')
})

router.post('/users/login', passport.authenticate('local', {//Passport 套件功能
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/users/register', (req, res) => {
  res.render('register')
})

router.post('/users/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/users/logout', (req, res) => {
  res.send('logout')
})

module.exports = router