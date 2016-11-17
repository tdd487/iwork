'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let findAll = exports.findAll = function *findAll() {
  const query = this.request.query
  baseService.data = yield dataProvider.Company.findAll(query)
  this.body = baseService.setBody(true, '')
};
let add = exports.add = function *add() {
  let model = yield parse(this)
  baseService.data = yield dataProvider.Company.create(model)
  this.body = baseService.setBody(true, '添加成功！')
};
let update = exports.update = function *update() {
  let model = yield parse(this)
  baseService.data = yield dataProvider.Company.update(model)
  this.body = baseService.setBody(true, '修改成功！')
};
let del = exports.del = function *del() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.Company.del(data.id)
  this.body = baseService.setBody(true, '删除成功！')
};
exports.register = function (router) {
  router.get('/company/list', findAll)
  router.post('/company/add', add)
  router.post('/company/update', update)
  router.delete('/company/del', del)
};