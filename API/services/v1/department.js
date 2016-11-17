'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let update = exports.update = function *update() {
    let data = yield parse(this)
    baseService.data = yield dataProvider.Kht.update(data)
    this.body = baseService.setBody(true, '修改成功！')
};
let del = exports.del = function *del() {
    let body = yield parse(this)
    baseService.data = yield dataProvider.Kht.del(body.id)
    this.body = baseService.setBody(true, '删除成功！')
};

exports.register = function (router) {
  router.post('/menu/update', update)
  router.delete('/menu/del', del)
};