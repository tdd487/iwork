'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let add = exports.add = function *add() {
  let le = yield parse(this)
  baseService.data = yield dataProvider.Le.create(le)
  this.body = baseService.setBody(true, '添加成功！')
};

let update = exports.update = function *update() {
  let data = yield parse(this)
  baseService.data = yield dataProvider.Le.update(data)
  this.body = baseService.setBody(true, '修改成功！')
};

let findAll = exports.findAll = function *findAll() {
  const query = this.request.query
  baseService.data = yield dataProvider.Le.findAll(query)
  this.body = baseService.setBody(true, '')
};

let del = exports.del = function *del() {
  let body = yield parse(this)
  baseService.data = yield dataProvider.Le.del(body.id)
  this.body = baseService.setBody(true, '删除成功！')
};
let getLeList = exports.getLeList = function *getLeList() {
  const query = this.request.query
  baseService.data = yield dataProvider.Le.getLeList(query)
  this.body = baseService.setBody(true, '')
};

exports.register = function (router) {
  router.post('/le/add', add)
  router.post('/le/update', update)
  router.get('/le/list', getLeList)
  router.delete('/le/del', del)
};