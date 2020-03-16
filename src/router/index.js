import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/components/Login'
import AppHome from '@/components/home/AppHome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/index',
      name: 'AppHome',
      component: AppHome
    }
  ]
})
