const Home = resolve => require.ensure([], () => resolve(require('./../components/Home.vue')), 'group-index')
const MenuList = resolve => require.ensure([], () => resolve(require('./../components/system/MenuList.vue')), 'group-system')
const BtnList = resolve => require.ensure([], () => resolve(require('./../components/system/BtnList.vue')), 'group-system')
const BtnEdit = resolve => require.ensure([], () => resolve(require('./../components/system/BtnEdit.vue')), 'group-system')
const RoleList = resolve => require.ensure([], () => resolve(require('./../components/system/RoleList.vue')), 'group-system')
const RoleAuth = resolve => require.ensure([], () => resolve(require('./../components/system/RoleAuth.vue')), 'group-system')
const UserList = resolve => require.ensure([], () => resolve(require('./../components/system/UserList.vue')), 'group-system')
export default [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: 'menu',
    name: 'menuList',
    component: MenuList
  },
  {
    path: 'btn',
    name: 'btnList',
    component: BtnList
  },
  {
    path: 'btn/edit',
    name: 'btnEdit',
    component: BtnEdit
  },
  {
    path: 'role',
    name: 'roleList',
    component: RoleList
  },
  {
    path: 'role/:roleId/auth',
    name: 'roleAuth',
    component: RoleAuth
  },
  {
    path: 'user',
    name: 'userList',
    component: UserList
  }
]
