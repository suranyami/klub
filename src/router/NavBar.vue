<template lang="pug">
  nav.navbar.is-primary.is-fixed-top(role='navigation' aria-label='main navigation')
    .navbar-brand
      .navbar-item
        h1.title Klub

      a.navbar-burger.burger(role='button'
        aria-label='menu'
        aria-expanded='false'
        data-target='navbarBasicExample'
        @click='isOpen = !isOpen'
        v-bind:class="{'is-active': isOpen}")

        span(aria-hidden='true')
        span(aria-hidden='true')
        span(aria-hidden='true')

    #navbarBasicExample.navbar-menu(v-bind:class="{'is-active': isOpen}")
      .navbar-start
        router-link.navbar-item(to='/home')
          span.icon
            i.fas.fa-home
        router-link.navbar-item(to='/users') Users
      .navbar-end
        a.navbar-item(v-if='userId' @click='logout()') Logout
        router-link.navbar-item(to='/login' v-if='!userId') Login
</template>

<script>
import { MY_USER_ID, AUTH_TOKEN } from '../constants/settings'

export default {
  name: 'NavBar',
  data: function () {
    return {
      isOpen: false
    }
  },
  computed: {
    userId () {
      return this.$root.$data.userId
    }
  },
  methods: {
    logout () {
      localStorage.removeItem(MY_USER_ID)
      localStorage.removeItem(AUTH_TOKEN)
      this.$root.$data.userId = localStorage.getItem(MY_USER_ID)
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style lang="scss">
@import "bulma/sass/utilities/_all.sass";

.router-link-exact-active {
  background-color: $link-active;
  color: $text-invert;
}

.hero {
  margin-top: 32px;
}
</style>
