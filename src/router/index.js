import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/auth/Login'
import List from '@/users/List'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/users',
      name: 'Users',
      component: List
    }
  ]
})
