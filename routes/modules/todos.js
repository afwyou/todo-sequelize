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

//修改todo
router.get('/:id/edit', (req, res) => {
  const UserId = req.user.id
  const id = req.params.id

  return Todo.findOne({ where: { id, UserId } })
    .then(todo => res.render('edit', { todo: todo.get() }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const UserId = req.user.id//從passport取得
  const id = req.params.id//從request網址取得
  const { name, isDone } = req.body//從表單填入取得
  console.log(req.body)
  //找出符合條件的todo
  return Todo.findOne({ where: { id, UserId } })
    .then(todo => {
      //將todo的值更新
      todo.name = name
      todo.isDone = isDone === 'on'//如果checkbox有打勾，req.body回傳的物件屬性isDone的值為'on' 例如：{ isDone: 'on', name: '買菜' }
      //透過邏輯運算子將布林值存入todo.isDone(資料庫的todo schema預設為false(0))

      //儲存入資料庫
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${id}`))
    .catch(error => console.log(error))
})


module.exports = router