//request從瀏覽器發過來之後，就會先經過伺服器的usePassport(app)
//此時就會有req.isAuthenticated()
//app.use再存入res.locals
//request結束前置處理進入路由
//路由使用authenticator這個middleware來驗證req.isAuthenticated()的狀態

//教案流程先建置了authenticator處理路由的流程
//再將前置作業app.use部分補上res.locals
//接著就可以將變數傳入樣板

module.exports = {//物件裡面有一個函式屬性
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/users/login')
  }
}