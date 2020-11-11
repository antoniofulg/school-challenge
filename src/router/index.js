import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/dashboard/Index.vue'
import StudentsIndex from '@/views/students/Index.vue'
import StudentsUpdate from '@/views/students/Update.vue'
import TeachersIndex from '@/views/teachers/Index.vue'
import TeachersUpdate from '@/views/teachers/Update.vue'
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
        component: Dashboard,
      },
      {
        path: 'alunos',
        name: 'Students',
        component: StudentsIndex,
      },
      {
        path: 'alunos/editar/:id',
        name: 'StudentUpdate',
        component: StudentsUpdate,
        props: true,
      },
      {
        path: 'professores',
        name: 'Teachers',
        component: TeachersIndex,
      },
      {
        path: 'professores/editar/:id',
        name: 'TeacherUpdate',
        component: TeachersUpdate,
        props: true,
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
