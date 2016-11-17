import api from '../../api'

export default {
  state: {
    menuName: '',
    kh: {},
    le: {},
    leList: [],
    letList: [],
    letId: 0,
    khtId: 0,
    khtList: [],
    khList: []
  },
  getters: {
    getFirstKht (state) {
      return state.khtList
        .filter(t => t.parentId === null)
    },
    getFirstLet (state) {
      return state.letList
        .filter(t => t.parentId === null)
    }
  },
  mutations: {
    khEdit (state, kh) {
      state.kh = kh
    },
    leEdit (state, le) {
      state.le = le
    },
    sendKhtId (state, khtId) {
      state.khtId = khtId
    },
    updateLetId (state, letId) {
      state.letId = letId
    }
  },
  actions: {
    // 货物档案
    getLeList ({state, rootState}, opts) {
      api.getLeList(opts).then(function (res) {
        if (res.body.success) {
          state.leList = res.body.data.rows
          rootState.total = res.body.data.count
        }
      })
    },
    addLe ({dispatch, commit, state, rootState}, opts) {
      return new Promise((resolve, reject) => {
        api.addLe(opts).then(function (res) {
          commit('apiSuccess', res.body)
          if (res.body.success) {
            dispatch('getLeList', {
              offset: rootState.pageSize * (rootState.page - 1),
              limit: rootState.pageSize,
              letId: state.letId
            })
            resolve()
          }
        })
      })
    },
    updateLe ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.updateLe(opts).then(function (res) {
          if (res.body.success) {
            commit('apiSuccess', res.body)
            let index = state.leList.findIndex((val) => val.id === opts.id)
            state.leList.splice(index, 1, opts)
            resolve()
          }
        })
      })
    },
    delLe ({dispatch, commit, state, rootState}, opts) {
      api.delLe(opts.id).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
          dispatch('getLeList', {
            offset: rootState.pageSize * (rootState.page - 1),
            limit: rootState.pageSize,
            letId: state.letId
          })
        }
      })
    },
    // 货物分类
    getLetList ({state, rootState}, opts) {
      api.getLetList(opts).then(function (res) {
        if (res.body.success) {
          state.letList = res.body.data
        }
      })
    },
    addLet ({dispatch, commit, state}, opts) {
      api.addLet(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getLetList')
          commit('apiSuccess', res.body)
        }
      })
    },
    updateLet ({dispatch, commit, state}, opts) {
      api.updateLet(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getLetList')
          commit('apiSuccess', res.body)
        }
      })
    },
    delLet ({dispatch, commit, state}, opts) {
      api.delLet(opts.id).then(function (res) {
        if (res.body.success) {
          dispatch('getLetList')
          commit('apiSuccess', res.body)
        }
      })
    },
    findLetById ({dispatch, commit, state}, opts) {
      return new Promise((resolve, reject) => {
        api.findLetById(opts).then(function (res) {
          if (res.body.success) {
            resolve(res.body.data)
          }
        })
      })
    },
    // 单位分类
    getKhtList ({state}, opts) {
      api.getKhtList(opts).then(function (res) {
        if (res.body.success) {
          state.khtList = res.body.data
        }
      })
    },
    addKht ({dispatch, commit, state}, opts) {
      api.addKht(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getKhtList')
          commit('apiSuccess', res.body)
        }
      })
    },
    updateKht ({dispatch, commit, state}, opts) {
      api.updateKht(opts).then(function (res) {
        if (res.body.success) {
          dispatch('getKhtList')
          commit('apiSuccess', res.body)
        }
      })
    },
    delKht ({dispatch, commit, state}, opts) {
      api.delKht(opts.id).then(function (res) {
        if (res.body.success) {
          dispatch('getKhtList')
          commit('apiSuccess', res.body)
        }
      })
    },
    // 单位资料
    getKhList ({state, rootState}, opts) {
      api.getKhList(opts).then(function (res) {
        if (res.body.success) {
          state.khList = res.body.data.rows
          rootState.total = res.body.data.count
        }
      })
    },
    addKh ({dispatch, commit, state, rootState}, opts) {
      api.addKh(opts).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
        }
      })
    },
    updateKh ({dispatch, commit, state, rootState}, opts) {
      api.updateKh(opts).then(function (res) {
        if (res.body.success) {
          commit('apiSuccess', res.body)
        }
      })
    },
    delKh ({dispatch, commit, state, rootState}, opts) {
      api.delKh(opts.id).then(function (res) {
        if (res.body.success) {
          dispatch('getKhList', {offset: rootState.pageSize * (rootState.page - 1), limit: rootState.pageSize, khtId: state.khtId})
          commit('apiSuccess', res.body)
        }
      })
    }
  }
}

