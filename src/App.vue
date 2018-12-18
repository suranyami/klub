<template>
  <div>
    <nav-bar/>
    <section class="hero is-medium is-fullheight-with-navbar">
      <div class="body">
        <router-view/>
      </div>

      <div class="hero-foot">
        <my-footer/>
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from './router/NavBar.vue'
import Footer from './components/Footer.vue'
export default {
  components: {
    'nav-bar': NavBar,
    'my-footer': Footer
  },
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: 'Work Sans', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
