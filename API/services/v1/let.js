'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let add = exports.add = function *add() {
  let let1 = yield parse(this)
  baseService.data = yield dataProvider.Let.create(let1)
  this.body = baseService.setBody(true, '添加成功！')
};

let update = exports.update = function *update() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.Let.update(data)
  this.body = baseService.setBody(true, '修改成功！')
};

let findAll = exports.findAll = function *findAll() {
  baseService.data = yield dataProvider.Let.findAll()
  this.body = baseService.setBody(true, '')
};

let del = exports.del = function *del() {
  let body = yield parse(this)
  baseService.data = yield dataProvider.Let.del(body.id)
  this.body = baseService.setBody(true, '删除成功！')
};

exports.register = function (router) {
  router.post('/let/add', add)
  router.post('/let/update', update)
  router.get('/let/list', findAll)
  router.delete('/let/del', del)
};