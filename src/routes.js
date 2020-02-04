import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login.vue'
import todolist from '@/views/todolist.vue'
import home2 from '@/components/home2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: login,
    name: 'today'
  },
  {
    path: '/foo',
    component: home2,
    name: 'home2'
  },
  {
    path: '/login',
    component: login,
    name: 'login'
  },
  {
    path: '/todolist',
    component: todolist,
    name: 'todolist'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router