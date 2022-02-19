import router from './router'
import { getToken } from './utils/auth.js'
import { isAdmin, adminRole } from './utils/role.js'
//增加路由守卫
router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  const roleAdmin = isAdmin()
  const adminPaths = adminRole()
  if (hasToken) {
    if (!roleAdmin) {
      if (
        adminPaths.find((r) => {
          return r === to.path
        })
      ) {
        next({ path: '/index' })
      } else next()
    } else {
      next()
    }
  } else {
    //next({ path: '/index' })
    if (
      adminPaths.find((r) => {
        return r === to.path
      })
    ) {
      next({ path: '/login' })
    } else next()
  }
})
