import api from '../../api'
// import cookies from 'js-cookie'

export default {
  state: {
    departmentList: [],
    menuContent: '',
    contentId: 0,
    menuName: '',
    btn: {},
    btnList: [],
    roleList: [],
    userList: [],
    companyList: []
  },
  getters: {
    getFirstDepartment (state) {
      return state.departmentList
        .filter(t => t.parentId === null)
    }
  },
  mutations: {
    btnEdit (state, btn) {
      state.btn = btn
    }
  },
  actions: {
    // 公司资料
    getCompanyList ({state, rootState}, opts) {
      api.getCompanyList(opts).then(function (res) {
        if (res.body.success) {
          state.companyList = res.body.data.rows
          rootState.total = res.body.data.count
        }
      })
    },
    addCompany ({dispatch, commit, state, rootState}, opts) {
      return new Promise((resolve, reject) => {
        api.addCompany(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            dispatch('getCompanyList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
            resolve()
          }
        })
      })
    },
    updateCompany ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.updateCompany(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            let index = state.companyList.findIndex((val) => val.id === opts.id)
            state.companyList.splice(index, 1, opts)
            resolve()
          }
        })
      })
    },
    delCompany ({dispatch, commit, state, rootState}, opts) {
      api.delRole(opts.id).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
          dispatch('getRoleList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize})
        }
      })
    }
  }
}

