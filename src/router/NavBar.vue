<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <h1 class="title">Klub</h1>
      </a>

      <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">
          <span class="icon">
            <i class="fas fa-home"></i>
          </span>
        </router-link>
        <router-link to="/page2" class="navbar-item">Page2</router-link>
      </div>
      <div class="navbar-end">
        <div v-if="userId" class="navbar-item" @click="logout()">Logout</div>
        <router-link v-else to="/login" class="navbar-item">Login</router-link>
        <router-link to="/register" class="navbar-item">Register</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { USER_ID, AUTH_TOKEN } from '../constants/settings'

export default {
  name: 'NavBar',
  computed: {
    userId () {
      return this.$root.$data.userId
    }
  },
  methods: {
    logout () {
      localStorage.removeItem(USER_ID)
      localStorage.removeItem(AUTH_TOKEN)
      this.$root.$data.userId = localStorage.getItem(USER_ID)
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/main.scss';
  .navbar {
    margin-bottom: $gap / 2;
  }
</style>
