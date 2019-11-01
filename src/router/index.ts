import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '@/views/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'search',
    component: Search
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: 'student',
        children: [
          {
            path: 'obtain',
            component: () => import('@/views/ObtainStudentCertificate.vue')
          },
          {
            path: 'unobtain',
            name: 'unobtainCertificate',
            component: () => import('@/views/UnobtainStudentCertificate.vue')
          }
        ]
      },
      {
        path: 'factory',
        name: 'factory',
        component: () => import('@/views/FactoryCertificate.vue')
      },
      {
        path: 'certificatetype',
        name: 'certificateType',
        component: () => import('@/views/CertificateType.vue')
      },
      {
        path: 'train',
        name: 'trainTime',
        component: () => import('@/views/TrainTime.vue')
      },
      {
        path: 'systemset',
        name: 'SystemSet',
        component: () => import('@/views/SystemSet.vue')
      }
    ]
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: () => import('@/views/SearchResult.vue')
  },
  {
    path: '/admin/*',
    redirect: '/admin/student/obtain'
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
