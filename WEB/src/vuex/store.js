import Vue from 'vue'
import Vuex from 'vuex'
import system from './modules/system'
import pub from './modules/public'
import basicdata from './modules/basicdata'
import sysmesage from './modules/sysmesage'

Vue.use(Vuex)

let state = {
  userAuth: [],
  menuSelect: '',
  showLoading: false,
  closeDialog: false,
  message: {},
  menuName: '',
  menuCode: '',
  page: 1,
  pageSize: 20,
  total: 0
}
let getters = {
  authBtns (state) {
    let btns = []
    state.userAuth.forEach(t => {
      let menu = t.children.find(t2 => t2.code === state.menuCode)
      if (menu && menu.menuBtns) {
        state.menuName = menu.name
        btns = menu.menuBtns.filter(t3 => t3.btn.code !== 'list').map(t3 => {
          return t3.btn
        })
      }
    })
    return btns
  }
}
let mutations = {
  changeMenu (state, code) {
    state.menuCode = code
    state.menuSelect = '/' + code
  },
  changeMenuName (state, name) {
    state.menuName = name
  },
  apiSuccess (state, body) {
    state.message = {
      message: body.message,
      type: body.success ? 'success' : 'error'
    }
    state.closeDialog = true
  },
  noSelect: (state, opts) => {
    state.message = {
      message: '请选择一行数据',
      type: 'warning' // success/warning/info/error
    }
  },
  alertMsg: (state, opts) => {
    state.message = {
      message: opts.msg,
      type: opts.type // success/warning/info/error
    }
  },
  changePageSize: (state, val) => {
    state.pageSize = val
  },
  changePage: (state, val) => {
    state.page = val
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  modules: {
    system: system,
    public: pub,
    basicdata: basicdata,
    sysmesage: sysmesage
  }
})
