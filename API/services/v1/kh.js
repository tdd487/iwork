'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let add = exports.add = function *add() {
    let kh = yield parse(this)
    baseService.data = yield dataProvider.Kh.create(kh)
    this.body = baseService.setBody(true, '添加成功！')
};

let update = exports.update = function *update() {
    let data = yield parse(this)
    baseService.data = yield dataProvider.Kh.update(data)
    this.body = baseService.setBody(true, '修改成功！')
};

let getKhList = exports.getKhList = function *getKhList() {
    const query = this.request.query
    baseService.data = yield dataProvider.Kh.getKhList(query)
    this.body = baseService.setBody(true, '')
};

let del = exports.del = function *del() {
    let body = yield parse(this)
    baseService.data = yield dataProvider.Kh.del(body.id)
    this.body = baseService.setBody(true, '删除成功！')
};

exports.register = function (router) {
    router.post('/kh/add', add)
    router.post('/kh/update', update)
    router.get('/kh/list', getKhList)
    router.delete('/kh/del', del)
};