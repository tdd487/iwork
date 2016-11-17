'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let add = exports.add = function *add() {
  let menu = yield parse(this)
  baseService.data = yield dataProvider.Menu.create(menu)
  this.body = baseService.setBody(true, '添加成功！')
};

let update = exports.update = function *update() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.Menu.update(data)
  this.body = baseService.setBody(true, '修改成功！')
};

let findAll = exports.findAll = function *findAll() {
  baseService.data = yield dataProvider.Menu.findAll()
  this.body = baseService.setBody(true, '')
};

let del = exports.del = function *del() {
  let body = yield parse(this)
  baseService.data = yield dataProvider.Menu.del(body.id)
  this.body = baseService.setBody(true, '删除成功！')
};

exports.register = function (router) {
  router.post('/menu/add', add)
  router.post('/menu/update', update)
  router.get('/menu/list', findAll)
  router.delete('/menu/del', del)
};