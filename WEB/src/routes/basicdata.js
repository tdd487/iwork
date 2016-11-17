const LeList = resolve => require.ensure([], () => resolve(require('./../components/basicdata/LeList.vue')), 'group-basicdata')
const KhtList = resolve => require.ensure([], () => resolve(require('./../components/basicdata/KhtList.vue')), 'group-basicdata')
const KhList = resolve => require.ensure([], () => resolve(require('./../components/basicdata/KhList.vue')), 'group-basicdata')
const KhEdit = resolve => require.ensure([], () => resolve(require('./../components/basicdata/KhEdit.vue')), 'group-basicdata')
const LeEdit = resolve => require.ensure([], () => resolve(require('./../components/basicdata/LeEdit.vue')), 'group-basicdata')
const LetList = resolve => require.ensure([], () => resolve(require('./../components/basicdata/LetList.vue')), 'group-basicdata')
const CompanyList = resolve => require.ensure([], () => resolve(require('./../components/basicdata/CompanyList.vue')), 'group-basicdata')
const DepartmentList = resolve => require.ensure([], () => resolve(require('./../components/basicdata/DepartmentList.vue')), 'group-basicdata')
export default [
  {
    path: 'le',
    name: 'leList',
    component: LeList
  },
  {
    path: 'kht',
    name: 'khtList',
    component: KhtList
  },
  {
    path: 'kh',
    name: 'khList',
    component: KhList
  },
  {
    path: 'kh/edit',
    name: 'khEdit',
    component: KhEdit
  },
  {
    path: 'le/edit',
    name: 'leEdit',
    component: LeEdit
  },
  {
    path: 'let',
    name: 'letList',
    component: LetList
  },
  {
    path: 'company',
    name: 'companyList',
    component: CompanyList
  },
  {
    path: 'company/departmentList',
    name: 'departmentList',
    component: DepartmentList
  }
]
