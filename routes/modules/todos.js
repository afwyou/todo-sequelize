const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo//資料庫設定的表格名稱是Todo，但在資料庫會是Todos，設定檔名稱是todo.js
// const User = db.User

//新增todo
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
  const UserId = req.user.id
  const name = req.body.name

  return Todo.create({ name, UserId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//查詢todo
router.get('/:id', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id//製作版面的按鈕連結就會帶著ID
  return Todo.findOne({
    where: { id, UserId }
  })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router