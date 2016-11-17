'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let findAll = exports.findAll = function *findAll() {
  const query = this.request.query
  baseService.data = yield dataProvider.Role.findAll(query)
  this.body = baseService.setBody(true, '')
};

let add = exports.add = function *add() {
  let model = yield parse(this)
  baseService.data = yield dataProvider.Role.create(model)
  this.body = baseService.setBody(true, '添加成功！')
};

let update = exports.update = function *update() {
  let model = yield parse(this)
  baseService.data = yield dataProvider.Role.update(model)
  this.body = baseService.setBody(true, '修改成功！')
};

let del = exports.del = function *del() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.Role.del(data.id)
  this.body = baseService.setBody(true, '删除成功！')
};
let getAuth = exports.getAuth = function *getAuth() {
  const query = this.request.query
  baseService.data = yield dataProvider.Role.getAuth(query)
  this.body = baseService.setBody(true, '')
};
let auth = exports.auth = function *auth() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.Role.auth(data)
  this.body = baseService.setBody(true, '保存成功！')
};

exports.register = function (router) {
  router.get('/role/list', findAll)
  router.post('/role/add', add)
  router.post('/role/update', update)
  router.delete('/role/del', del)
  router.get('/role/auth', getAuth)
  router.post('/role/auth', auth)
};