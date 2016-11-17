import VueRouter from 'vue-router'
import system from './system'
import basicdata from './basicdata'

// 用异步加载的方式引入组件
const Login = resolve => require.ensure([], () => resolve(require('./../components/Login.vue')), 'group-index')
const Index = resolve => require.ensure([], () => resolve(require('./../components/Index.vue')), 'group-index')

export default {
  router: new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
      {
        path: '/',
        component: Index,
        children: [...system, ...basicdata]
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '*',
        redirect: '/'
      }
    ]
  })
}
