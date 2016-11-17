'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

var login = exports.login = function *login() {
  let user = yield parse(this)
  user = yield dataProvider.User.findUser(user)
  if (user) {
    this.session.userId = user.id
    // 取权限列表
    let list = yield dataProvider.User.getUserAuth(user.id)
    // 取url
    let userUrls = []
    if (list) {
      list.forEach(m1 => {
        m1.children.forEach(m => {
          m.menuBtns.forEach(b => {
            userUrls.push(`/${m.code}/${b.btn.code}`)
          })
        })
      })
    }
    // 保存到session
    this.session.userAuth = list
    this.session.userUrls = userUrls
    baseService.success = true
    this.body = baseService.setBody(true, '登录成功')
  } else {
    this.body = baseService.setBody(false, '用户名密码不匹配')
  }
}

var changePsw = exports.changePsw = function *changePsw() {
  let user = yield parse(this)
  user = yield dataProvider.User.findUser(user)
  if (user) {
    yield dataProvider.User.update({userId: user.id, password: user.newPassword})
    this.body = baseService.setBody(true, '密码修改成功')
  } else {
    this.body = baseService.setBody(false, '用户名密码不匹配')
  }
}

let findAll = exports.findAll = function *findAll() {
  const query = this.request.query
  baseService.data = yield dataProvider.User.findAll(query)
  this.body = baseService.setBody(true, '')
}

let add = exports.add = function *add() {
  let model = yield parse(this)
  let user = yield dataProvider.User.findByUserName(model.username)
  if (user) {
    this.body = baseService.setBody(false, '用户名已经存在！')
  } else {
    baseService.data = yield dataProvider.User.create(model)
    this.body = baseService.setBody(true, '添加成功！')
  }
}

let update = exports.update = function *update() {
  let model = yield parse(this)
  baseService.data = yield dataProvider.User.update(model)
  this.body = baseService.setBody(true, '修改成功！')
}

let del = exports.del = function *del() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.User.del(data.id)
  this.body = baseService.setBody(true, '删除成功！')
}


exports.register = function (router) {
  router.post('/user/login', login)
  router.get('/user/list', findAll)
  router.post('/user/add', add)
  router.post('/user/update', update)
  router.delete('/user/del', del)
  router.post('/public/changePsw', changePsw)
}