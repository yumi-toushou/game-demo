import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import '@/assets/js/d3.min.js'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)

// 登录验证逻辑
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
router.afterEach(() => {
  window.scroll(0, 0)
})

app.mount('#app')
