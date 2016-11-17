import api from '../../api'

export default {
  state: {
    departmentList: []
  },
  mutations: {},
  getters: {
    getFirstDepartment (state) {
      return state.departmentList
        .filter(t => t.parentId === null)
    }
  },
  actions: {
    logout ({commit, state, rootState}) {
      api.logout().then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
          setTimeout(() => { window.location = '/login' }, 500)
        }
      })
    },
    getUserMenu ({commit, state, rootState}, opts) {
      return new Promise((resolve, reject) => {
        api.getUserMenu(opts).then(function (res) {
          if (res.body.success) {
            rootState.userAuth = res.body.data
            resolve()
          }
        })
      })
    },
    getBtns ({commit, state, rootState}, opts) {
      api.getBtns({code: opts}).then(function (res) {
        if (res.body.success) {
          rootState.userBtns = res.body.data
        }
      })
    },
    findKhtById ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.findKhtById(opts).then(function (res) {
          if (res.body.success) {
            resolve(res.body.data)
          }
        })
      })
    },
    findKhById ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.findKhById(opts).then(function (res) {
          if (res.body.success) {
            resolve(res.body.data)
          }
        })
      })
    },
    // 部门资料
    getDepartmentList ({state}, opts) {
      api.getDepartmentList(opts).then(function (res) {
        if (res.body.success) {
          state.departmentList = res.body.data
        }
      })
    },
    addDepartment ({dispatch, commit, state}, opts) {
      api.addDepartment(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getMenuList')
          commit('apiSuccess', res.body)
        }
      })
    },
    findDepartmentById ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.findDepartmentById(opts).then(function (res) {
          if (res.body.success) {
            resolve(res.body.data)
          }
        })
      })
    }
  }
}

