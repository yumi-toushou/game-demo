import { createRouter, createWebHistory } from 'vue-router'
import ErrorView from '../views/404.vue'
import Layout from '../components/Layout/Layout.vue'
import PageLayout from '../components/Layout/PageLayout.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('../views/index.vue')
        }
      ]
    },
    {
      path: "/",
      component: PageLayout,
      children: [
        {
          path: '/gobang',
          name: 'gobang',
          meta: { title: '五子棋' },
          component: () => import('../views/Component/Gobang/index.vue')
        },
        {
          path: '/lottery',
          name: 'lottery',
          meta: { title: '抽奖' },
          component: () => import('../views/lottery.vue')
        },
        {
          path: '/stepblack',
          name: 'stepblack',
          meta: { title: '别踩白块' },
          component: () => import('../views/Component/Stepblack/index.vue')
        },
        {
          path: '/video',
          name: 'video',
          component: () => import('../views/Component/Video/index.vue')
        },
        {
          path: '/music',
          name: 'music',
          meta: { title: '音乐' },
          component: () => import('../views/music.vue')
        },
      ]
    },
    {
      path: '/:pathMatch(.*)',
      name: '404',
      component: ErrorView
    }
  ]
})

export default router
