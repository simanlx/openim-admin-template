import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/data-statistics/user-statistics',

  },

  {
    path: '/data-statistics',
    component: Layout,
    redirect: '/data-statistics/user-statistics',
    name: 'data-statistics',
    meta: { title: '数据统计', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'user-statistics',
        name: 'user-statistics',
        component: () => import('@/views/user-statistics'),
        meta: { title: '用户统计', icon: 'el-icon-user-solid' }
      },
      {
        path: 'info-statistics',
        name: 'info-statistics',
        component: () => import('@/views/info-statistics'),
        meta: { title: '消息统计', icon: 'el-icon-s-comment' }
      }
    ]
  }, {
    path: '/operation-management',
    component: Layout,
    redirect: '/operation-management/user-management',
    name: 'operation-management',
    meta: { title: '运营管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'user-management',
        name: 'user-management',
        component: () => import('@/views/user-management'),
        meta: { title: '用户管理', icon: 'el-icon-user-solid' }
      },
      {
        path: 'blocked-user-list',
        name: 'blocked-user-list',
        component: () => import('@/views/blocked-user-list'),
        meta: { title: '封禁用户列表', icon: 'el-icon-s-comment' }
      }
    ]
  },


  {
    path: '/message-management',
    component: Layout,
    redirect: '/message-management/message-list',
    name: 'message-management',
    meta: { title: '消息管理', icon: 'el-icon-s-comment' },
    children: [
      {
        path: 'message-list',
        name: 'message-list',
        component: () => import('@/views/message-list'),
        meta: { title: '消息列表', icon: 'table' }
      },
      {
        path: 'user-message',
        name: 'user-message',
        component: () => import('@/views/user-message'),
        meta: { title: '用户消息', icon: 'el-icon-s-custom' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
