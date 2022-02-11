export default [
  {
    path: '/index',
    name: 'dashboard',
    meta: { title: '控制台', icon: 'dashboard' },
    component: () => import('../pages/index/Index.vue'),
  },
  {
    path: '/user',
    name: 'userManage',
    meta: { title: '用户管理', icon: 'manage_accounts' },
    component: () => import('../pages/user/Index.vue'),
  },
]
