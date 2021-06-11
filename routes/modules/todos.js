const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo//資料庫設定的表格名稱是Todo，但在資料庫會是Todos，設定檔名稱是todo.js
// const User = db.User

router.get('/todos/:id', (req, res) => {
  const id = req.params.id//製作版面的按鈕連結就會帶著ID
  return Todo.findByPk(id)
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router