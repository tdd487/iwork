import api from '../../api'
// import cookies from 'js-cookie'

export default {
  state: {
    menuList: [],
    menuContent: '',
    contentId: 0,
    menuName: '',
    btn: {},
    btnList: [],
    roleList: [],
    userList: []
  },
  getters: {
    getFirstMenu (state) {
      return state.menuList
        .filter(t => t.parentId === null)
    }
  },
  mutations: {
    btnEdit (state, btn) {
      state.btn = btn
    }
  },
  actions: {
    login ({commit, state, rootState}, opts) {
      return new Promise((resolve, reject) => {
        api.login(opts).then(function (res) {
          commit('apiSuccess', res.body)
          if (res.body.success) {
            resolve()
          }
        })
      })
    },
    // 菜单
    getMenuList ({state}, opts) {
      api.getMenuList(opts).then(function (res) {
        if (res.body.success) {
          state.menuList = res.body.data
        }
      })
    },
    addMenu ({dispatch, commit, state}, opts) {
      api.addMenu(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getMenuList')
          commit('apiSuccess', res.body)
        }
      })
    },
    updateMenu ({dispatch, commit, state}, opts) {
      api.updateMenu(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getMenuList')
          commit('apiSuccess', res.body)
        }
      })
    },
    delMenu ({dispatch, commit, state}, opts) {
      api.delMenu(opts.id).then(function (res) {
        if (res.body.success) {
          dispatch('getMenuList')
          commit('apiSuccess', res.body)
        }
      })
    },
    findMenuById ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.findMenuById(opts).then(function (res) {
          if (res.body.success) {
            resolve(res.body.data)
          }
        })
      })
    },
    // 按钮
    getBtnList ({state, rootState}, opts) {
      api.getBtnList(opts).then(function (res) {
        if (res.body.success) {
          state.btnList = res.body.data.rows
          rootState.total = res.body.data.count
        }
      })
    },
    addBtn ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.addBtn(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            resolve()
          }
        })
      })
    },
    updateBtn ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.updateBtn(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            resolve()
          }
        })
      })
    },
    delBtn ({dispatch, commit, state, rootState}, opts) {
      api.delBtn(opts.id).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
          dispatch('getBtnList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
        }
      })
    },
    // 角色
    getRoleList ({state, rootState}, opts) {
      api.getRoleList(opts).then(function (res) {
        if (res.body.success) {
          state.roleList = res.body.data.rows
          rootState.total = res.body.data.count
        }
      })
    },
    addRole ({dispatch, commit, state, rootState}, opts) {
      return new Promise((resolve, reject) => {
        api.addRole(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            dispatch('getRoleList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
            resolve()
          }
        })
      })
    },
    updateRole ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.updateRole(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            let index = state.roleList.findIndex((val) => val.id === opts.id)
            state.roleList.splice(index, 1, opts)
            resolve()
          }
        })
      })
    },
    delRole ({dispatch, commit, state, rootState}, opts) {
      api.delRole(opts.id).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
          dispatch('getRoleList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
        }
      })
    },
    findRoleAuth ({state}, opts) {
      return new Promise((resolve, reject) => {
        api.findRoleAuth(opts).then(function (res) {
          if (res.body.success) {
            resolve(res.body.data)
          }
        })
      })
    },
    roleAuth ({dispatch, commit, state, rootState}, opts) {
      api.roleAuth(opts).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
        }
      })
    },
    // 用户
    getUserList ({state, rootState}, opts) {
      api.getUserList(opts).then(function (res) {
        if (res.body.success) {
          state.userList = res.body.data.rows
          rootState.total = res.body.data.count
        }
      })
    },
    addUser ({dispatch, commit, state, rootState}, opts) {
      return new Promise((resolve, reject) => {
        api.addUser(opts).then(function (res) {
          commit('apiSuccess', res.body)
          if (res.body.success) {
            dispatch('getUserList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
            resolve()
          }
        })
      })
    },
    updateUser ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.updateUser(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            let index = state.userList.findIndex((val) => val.id === opts.id)
            state.userList.splice(index, 1, opts)
            resolve()
          }
        })
      })
    },
    delUser ({dispatch, commit, state, rootState}, opts) {
      api.delUser(opts.id).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
          dispatch('getUserList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
        }
      })
    }
  }
}

