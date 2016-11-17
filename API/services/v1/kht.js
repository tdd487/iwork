'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let add = exports.add = function *add() {
    let kht = yield parse(this)
    baseService.data = yield dataProvider.Kht.create(kht)
    this.body = baseService.setBody(true, '添加成功！')
};

let update = exports.update = function *update() {
    let data = yield parse(this)
    baseService.data = yield dataProvider.Kht.update(data)
    this.body = baseService.setBody(true, '修改成功！')
};

let findAll = exports.findAll = function *findAll() {
    baseService.data = yield dataProvider.Kht.findAll()
    this.body = baseService.setBody(true, '')
};

let del = exports.del = function *del() {
    let body = yield parse(this)
    baseService.data = yield dataProvider.Kht.del(body.id)
    this.body = baseService.setBody(true, '删除成功！')
};

exports.register = function (router) {
    router.post('/kht/add', add)
    router.post('/kht/update', update)
    router.get('/kht/list', findAll)
    router.delete('/kht/del', del)
};