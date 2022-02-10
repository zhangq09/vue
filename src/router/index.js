import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../pages/Layout.vue'

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/index',
        component: () => import('../pages/index/Index.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../pages/Login.vue'),
  },
  {
    path: '/403',
    component: () => import('../pages/403.vue'),
  },
  {
    path: '/404',
    component: () => import('../pages/404.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
