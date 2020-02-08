import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login,
    name: 'today'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router