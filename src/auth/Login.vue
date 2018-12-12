<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title">Login</h3>
      <p class="subtitle">Please login to proceed.</p>
      <div class="box">
        <form>
          <div class="field">
            <div class="control">
              <input class="input is-large" type="email" placeholder="Your Email" autofocus="">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input is-large" type="password" placeholder="Your Password">
            </div>
          </div>
          <div class="field">
            <label class="checkbox">
              <input type="checkbox">
              Remember me
            </label>
          </div>
          <button class="button is-block is-info is-large is-fullwidth">Login</button>
        </form>
      </div>
      <div class="tabs has-text-centered">
        <router-link to="/register" class="navbar-item">Register</router-link>
        <router-link to="/forgot" class="navbar-item">Forgot Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss">
  @import '@/assets/main.scss';

  .input {
    border-color: $grey-lighter;
  }
  .login-helpers {
    .navbar-item {
      width: 40%;
    }
  }
</style>
