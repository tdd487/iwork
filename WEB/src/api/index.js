import Vue from 'vue'
import VueResource from 'vue-resource'
import cookies from 'js-cookie'
import store from '../vuex/store'
import * as config from '../assets/js/config'

Vue.use(VueResource)

const pubResource = Vue.resource(config.serverAddr + '/public{/action}')
const usersResource = Vue.resource(config.serverAddr + '/user{/action}')
const menuResource = Vue.resource(config.serverAddr + '/menu{/action}')
const btnResource = Vue.resource(config.serverAddr + '/btn{/action}')
const roleResource = Vue.resource(config.serverAddr + '/role{/action}')
const leResource = Vue.resource(config.serverAddr + '/le{/action}')
const khtResource = Vue.resource(config.serverAddr + '/kht{/action}')
const khResource = Vue.resource(config.serverAddr + '/kh{/action}')
const letResource = Vue.resource(config.serverAddr + '/let{/action}')
const companyResource = Vue.resource(config.serverAddr + '/company{/action}')
const departmentResource = Vue.resource(config.serverAddr + '/department{/action}')

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  Vue.http.headers.common['token'] = cookies.get('token') || ''
  store.state.showLoading = true
  next((response) => {
    store.state.showLoading = false
    if (!response.ok) {
      if (response.status === 401) {
        window.location = '/login'
      } else {
        // 统一处理服务器异常！
        store.state.message = {
          message: '服务器异常，请稍后重试或联系管理员。',
          type: 'error'
        }
      }
    }
  })
})

export default {
  // public的请求
  getUserMenu (opts) {
    return pubResource.query({action: 'getUserMenu'})
  },
  getBtns (opts) {
    return pubResource.query({action: 'getBtns', ...opts})
  },
  findMenuById (opts) {
    return pubResource.query({action: 'findUser', ...opts})
  },
  logout (opts) {
    return pubResource.query({action: 'logout'}, opts)
  },
  findKhtById (opts) {
    return pubResource.query({action: 'findKht', ...opts})
  },
  findKhById (opts) {
    return pubResource.query({action: 'findKh', ...opts})
  },
  findLetById (opts) {
    return pubResource.query({action: 'findLet', ...opts})
  },
  // 登陆
  login (opts) {
    return usersResource.save({action: 'login'}, opts)
  },
  // 菜单
  getMenuList () {
    return menuResource.query({action: 'list'})
  },
  addMenu (opts) {
    return menuResource.save({action: 'add'}, opts)
  },
  updateMenu (opts) {
    return menuResource.save({action: 'update'}, opts)
  },
  delMenu (opts) {
    return menuResource.delete({action: 'del'}, {id: opts})
  },
  // 按钮
  getBtnList (opts) {
    return btnResource.query({action: 'list', ...opts})
  },
  addBtn (opts) {
    return btnResource.save({action: 'add'}, opts)
  },
  updateBtn (opts) {
    return btnResource.save({action: 'update'}, opts)
  },
  delBtn (opts) {
    return btnResource.delete({action: 'del'}, {id: opts})
  },
  // 角色
  getRoleList (opts) {
    return roleResource.query({action: 'list', ...opts})
  },
  addRole (opts) {
    return roleResource.save({action: 'add'}, opts)
  },
  updateRole (opts) {
    return roleResource.save({action: 'update'}, opts)
  },
  delRole (opts) {
    return roleResource.delete({action: 'del'}, {id: opts})
  },
  findRoleAuth (opts) {
    return roleResource.query({action: 'auth', ...opts})
  },
  roleAuth (opts) {
    return roleResource.save({action: 'auth'}, opts)
  },
  // 用户
  getUserList (opts) {
    return usersResource.query({action: 'list', ...opts})
  },
  addUser (opts) {
    return usersResource.save({action: 'add'}, opts)
  },
  updateUser (opts) {
    return usersResource.save({action: 'update'}, opts)
  },
  delUser (opts) {
    return usersResource.delete({action: 'del'}, {id: opts})
  },
  // 货物分类
  getLetList (opts) {
    return letResource.query({action: 'list', ...opts})
  },
  addLet (opts) {
    return letResource.save({action: 'add'}, opts)
  },
  updateLet (opts) {
    return letResource.save({action: 'update'}, opts)
  },
  delLet (opts) {
    return letResource.delete({action: 'del'}, {id: opts})
  },
  // 货物档案
  getLeList (opts) {
    return leResource.query({action: 'list', ...opts})
  },
  addLe (opts) {
    return leResource.save({action: 'add'}, opts)
  },
  updateLe (opts) {
    return leResource.save({action: 'update'}, opts)
  },
  delLe (opts) {
    return leResource.delete({action: 'del'}, {id: opts})
  },
  // 单位分类
  getKhtList () {
    return khtResource.query({action: 'list'})
  },
  addKht (opts) {
    return khtResource.save({action: 'add'}, opts)
  },
  updateKht (opts) {
    return khtResource.save({action: 'update'}, opts)
  },
  delKht (opts) {
    return khtResource.delete({action: 'del'}, {id: opts})
  },
  // 单位资料
  getKhList (opts) {
    return khResource.query({action: 'list', ...opts})
  },
  addKh (opts) {
    return khResource.save({action: 'add'}, opts)
  },
  updateKh (opts) {
    return khResource.save({action: 'update'}, opts)
  },
  delKh (opts) {
    return khResource.delete({action: 'del'}, {id: opts})
  },
  // 公司资料
  getCompanyList (opts) {
    return companyResource.query({action: 'list', ...opts})
  },
  addCompany (opts) {
    return companyResource.save({action: 'add'}, opts)
  },
  updateCompany (opts) {
    return companyResource.save({action: 'update'}, opts)
  },
  delCompany (opts) {
    return companyResource.delete({action: 'del'}, {id: opts})
  },
  // 部门资料
  getDepartmentList () {
    return pubResource.query({action: 'findDepartment'})
  },
  addDepartment (opts) {
    return pubResource.save({action: 'addDepartment'}, opts)
  },
  updateDepartment (opts) {
    return departmentResource.save({action: 'update'}, opts)
  },
  delDepartment (opts) {
    return departmentResource.delete({action: 'del'}, {id: opts})
  },
  findDepartmentById (opts) {
    return pubResource.query({action: 'findDepartmentById', ...opts})
  }
}
