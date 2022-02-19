export default [
  {
    path: '/index',
    name: 'dashboard',
    meta: { title: '控制台', icon: 'dashboard', isAdmin: false },
    component: () => import('../pages/dashboard/Index.vue'),
  },
  {
    path: '/user',
    name: 'userManage',
    meta: {
      title: '用户管理',
      icon: 'manage_accounts',
      isAdmin: true,
    },
    component: () => import('../pages/user/Index.vue'),
  },
  {
    path: '/music',
    name: 'musicPlayer',
    meta: {
      title: '音乐',
      icon: 'audiotrack',
      isAdmin: false,
    },
    component: () => import('../pages/music/MusicPlayer.vue'),
  },
  {
    path: '/upload',
    name: 'uploadFile',
    meta: {
      title: '上传',
      icon: 'audiotrack',
      isAdmin: false,
    },
    component: () => import('../pages/upload/Upload.vue'),
  },
]
