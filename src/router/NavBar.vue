<template>
  <nav class="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <div class="navbar-item">
        <h1 class="title ">Klub</h1>
      </div>
      <a role="button"
      class="navbar-burger burger"
      aria-label="menu" aria-expanded="false"
      data-target="navbarBasicExample"
      @click="isOpen = !isOpen"
      v-bind:class="{'is-active': isOpen}">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': isOpen}">
    <div class="navbar-start">
      <router-link to="/home" class="navbar-item">
        <span class="icon">
          <i class="fas fa-home"></i>
        </span>
      </router-link>
      <router-link to="/users" class="navbar-item">Users</router-link>
    </div>

    <div class="navbar-end">
      <a v-if="userId" @click="logout()" class="navbar-item">Logout</a>
      <router-link to="/login" v-if="!userId" class="navbar-item">Login</router-link>
    </div>
  </div>
</nav>
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
