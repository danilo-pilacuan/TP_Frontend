import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    // Document title tag
    // We combine it with defaultDocumentTitle set in `src/main.js` on router.afterEach hook
    meta: {
      title: 'Dashboard'
    },
    path: '/',
    name: 'home',
    component: Home
  },
  {
    meta: {
      title: 'Tables'
    },
    path: '/tables',
    name: 'tables',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "tables" */ '@/views/Tables.vue')
  },
  {
    meta: {
      title: 'Forms'
    },
    path: '/forms',
    name: 'forms',
    component: () => import('@/views/Forms.vue')
  },
  {
    meta: {
      title: 'Profile'
    },
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '@/views/Profile.vue')
  },
  {
    meta: {
      title: 'New Client'
    },
    path: '/client/new',
    name: 'client.new',
    component: () => import(/* webpackChunkName: "client-form" */ '@/views/ClientForm.vue')
  },
  {
    meta: {
      title: 'Edit Client'
    },
    path: '/client/:id',
    name: 'client.edit',
    component: () => import(/* webpackChunkName: "client-form" */ '@/views/ClientForm.vue'),
    props: true
  },
  /* Rutas Cruds*/
  {
    meta: {
      title: 'Activos'
    },
    path: '/activos',
    name: 'activos',
    component: () => import('@/views/Activos.vue')
  },
  {
    meta: {
      title: 'Areas'
    },
    path: '/areas',
    name: 'areas',
    component: () => import('@/views/Areas.vue')
  },
  {
    meta: {
      title: 'Categorias'
    },
    path: '/categorias',
    name: 'categorias',
    component: () => import('@/views/Categorias.vue')
  },
  {
    meta: {
      title: 'Edificios'
    },
    path: '/edificios',
    name: 'edificios',
    component: () => import('@/views/Edificios.vue')
  },
  {
    meta: {
      title: 'EstadoMantenimiento'
    },
    path: '/estadoMantenimiento',
    name: 'estadoMantenimiento',
    component: () => import('@/views/EstadoMantenimiento.vue')
  },
  {
    meta: {
      title: 'Periodicidades'
    },
    path: '/periodicidades',
    name: 'periodicidades',
    component: () => import('@/views/Periodicidades.vue')
  },
  {
    meta: {
      title: 'Prioridades'
    },
    path: '/prioridades',
    name: 'prioridades',
    component: () => import('@/views/Prioridades.vue')
  },
  {
    meta: {
      title: 'Tareas'
    },
    path: '/tareas',
    name: 'tareas',
    component: () => import('@/views/Tareas.vue')
  },
  {
    meta: {
      title: 'Trabajadores'
    },
    path: '/trabajadores',
    name: 'trabajadores',
    component: () => import('@/views/Trabajadores.vue')
  },
  {
    meta: {
      title: 'Usuarios'
    },
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/Usuarios.vue')
  },
  {
    meta: {
      title: 'Activo'
    },
    path: '/Activos/:id',
    name: 'Activo',
    component: () => import('@/views/ActivoFicha.vue')
  },

  //fin rutas cruds
  {
    path: '/full-page',
    component: () => import(/* webpackChunkName: "full-page" */ '@/views/FullPage.vue'),
    children: [
      {
        meta: {
          title: 'Login'
        },
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "full-page" */ '@/views/full-page/Login.vue')
      }
    ]
  }

]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router

export function useRouter () {
  return router
}
