import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/dashboard/Index.vue'
import DefaultLayout from '@/views/DefaultLayout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DefaultLayout',
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'alunos',
        name: 'Students',
        component: Dashboard
      },
      {
        path: 'professores',
        name: 'Teachers',
        component: Dashboard
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
