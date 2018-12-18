import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld2 from '@/components/HelloWorld2'
import Login from '@/auth/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
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
    }
  ]
})
