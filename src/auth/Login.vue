<template>
  <div class="container has-text-centered">
    <div class="column is-6 is-offset-2">
      <h3 class="title">Login</h3>
      <p class="subtitle">Please login to proceed.</p>
      <div class="box">
        <form>
          <div class="field">
            <div class="control">
              <input
                v-show="!login"
                v-model="firstName"
                class="input"
                type="text"
                placeholder="First name">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                v-show="!login"
                v-model="lastName"
                class="input"
                type="text"
                placeholder="Last name">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                v-model="email"
                class="input"
                type="email"
                placeholder="Your Email"
                autofocus="">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                v-model="password"
                class="input"
                type="password"
                placeholder="Your Password">
            </div>
          </div>

          <!-- <div class="field">
            <label class="checkbox">
              <input type="checkbox"/> Remember me
            </label>
          </div>
 -->
          <div class="field is-grouped">
            <div class="control">
              <button
                type="submit"
                class="button is-block is-info"
                @click="confirm()">
                {{login ? 'Login' : 'Create account'}}
              </button>
            </div>
            <div class="control">
              <button
                type="submit"
                class="button is-text"
                @click="login = !login">
                {{login ? 'Sign Up' : 'Already have an account?'}}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { MY_USER_ID, AUTH_TOKEN } from '../constants/settings'
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION } from './mutations'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      login: true,
      firstName: '',
      lastName: '',
      password: ''
    }
  },
  methods: {
    confirm () {
      const { firstName, lastName, email, password } = this.$data
      if (this.login) {
        this.$apollo.mutate({
          mutation: LOGIN_USER_MUTATION,
          variables: {email, password}
        }).then((result) => {
          const id = result.data.login.user.id
          const token = result.data.login.token
          this.saveUserData(id, token)
        }).catch((error) => {
          alert(error)
        })
      } else {
        this.$apollo.mutate({
          mutation: CREATE_USER_MUTATION,
          variables: {
            firstName,
            lastName,
            email,
            password
          }
        }).then((result) => {
          const id = result.data.createUser.user.id
          const token = result.data.createUser.token
          this.saveUserData(id, token)
        }).catch((error) => {
          alert(error)
          this.$router.push({ path: '/login' })
        })
      }
      this.$router.push({ path: '/home' })
    },
    saveUserData (id, token) {
      localStorage.setItem(MY_USER_ID, id)
      localStorage.setItem(AUTH_TOKEN, token)
      this.$root.$data.userId = localStorage.getItem(MY_USER_ID)
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/main.scss';

  .input {
    border-color: $grey-lighter;
  }
</style>
