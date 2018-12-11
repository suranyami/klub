import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld2 from '@/components/HelloWorld2'
import Login from '@/auth/Login'
import Register from '@/auth/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/page2',
      name: 'HelloWorld2',
      component: HelloWorld2
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
