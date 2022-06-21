import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../components/Login.vue"
import Home from "../views/Home.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next()
  }
  else {
    const tokenStr = sessionStorage.getItem('token');
    //强制跳转登录页
    if (!tokenStr) return next("/login")
  }
  //要总全部放行！！
  next()
})
export default router
