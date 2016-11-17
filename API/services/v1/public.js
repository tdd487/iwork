'use strict'
const dataProvider = require('../../data/dataProvider')
const parse = require('co-body')
const baseService = require('./baseService')

let getUserMenu = exports.getUserMenu = function *getUserMenu() {
  let userAuth = this.session.userAuth
  baseService.data = userAuth
  this.body = baseService.setBody(true, '')
}
let getBtns = exports.getBtns = function *getBtns() {
  const query = this.request.query
  baseService.data = {}
  let userAuths = this.session.userAuth
  if (userAuths != null) {
    let userAuth = userAuths.find(t => t.code === query.code)
    if(userAuth) {
      baseService.data = userAuth.btns
    }
  }
  this.body = baseService.setBody(true, '')
}
let findUser = exports.findUser = function *findUser() {
  const query = this.request.query
  baseService.data = yield dataProvider.Menu.findById(query.id)
  this.body = baseService.setBody(true, '')
};
let findLet = exports.findLet = function *findLet() {
  const query = this.request.query
  baseService.data = yield dataProvider.Let.findById(query.id)
  this.body = baseService.setBody(true, '')
};
var logout = exports.logout = function *logout() {
  this.session = null
  this.body = baseService.setBody(true, '成功退出')
}
let findKht = exports.findKht = function *findKht() {
  const query = this.request.query
  baseService.data = yield dataProvider.Kht.findById(query.id)
  this.body = baseService.setBody(true, '')
};
let findDepartment = exports.findAll = function *findAll() {
    baseService.data = yield dataProvider.DepartmentRec.findAll()
    this.body = baseService.setBody(true, '')
};
let addDepartment = exports.add = function *add() {
    let departmentRec = yield parse(this)
    baseService.data = yield dataProvider.DepartmentRec.create(departmentRec)
    this.body = baseService.setBody(true, '添加成功！')
};
let findDepartmentById = exports.DepartmentRec = function *findKht() {
    const query = this.request.query
    baseService.data = yield dataProvider.DepartmentRec.findById(query.id)
    this.body = baseService.setBody(true, '')
};
exports.register = function (router) {
  router.get('/public/logout', logout)
  router.get('/public/getUserMenu', getUserMenu)
  router.get('/public/getBtns', getBtns)
  router.get('/public/findUser', findUser)
  router.get('/public/findLet', findLet)
  router.get('/public/findKht', findKht)
  router.get('/public/findDepartment', findDepartment)
  router.get('/public/findDepartmentById', findDepartmentById)
  router.post('/public/addDepartment', addDepartment)
}