<template>
  <div class="container">
    <div id="app">
      <nav-bar/>
      <router-view/>
    </div>

    <button class="button is-primary">Button</button>
  </div>
</template>

<script>
import NavBar from './router/NavBar.vue'
export default {
  components: {
    'nav-bar': NavBar
  },
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Work Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
