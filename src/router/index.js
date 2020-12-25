import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProblemCollection from '@/views/ProblemCollection.vue'
import OriginJS from '@/views/OriginJS1.vue'
import Li10000 from '@/views/Li10000.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/example/OriginJS',
    name: 'OriginJS',
    component: OriginJS
  },
  {
    path:'/example/li10000',
    name:'li10000',
    component:Li10000
  },
  {
    path:'/problemcollection',
    name:'problemcollection',
    component:ProblemCollection
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
