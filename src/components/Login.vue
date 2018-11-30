<template>
  <div class="login">
    <form>{{ msg }}</form>
    <p>This is page 2</p>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'Page 2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
