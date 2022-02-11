import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../pages/Layout.vue'
import menuRoutes from './menuRoutes.js'
const constRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [...menuRoutes],
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
  routes: constRoutes,
})

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
