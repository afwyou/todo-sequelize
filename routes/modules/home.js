const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo//資料庫設定的表格名稱是Todo，但在資料庫會是Todos，設定檔名稱是todo.js
const User = db.User

router.get('/', (req, res) => {
  //先從User資料庫找有沒有user資料
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) throw new Error('user not found')
      //再去Todo資料庫找全部符合條件的todo
      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })
    })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router