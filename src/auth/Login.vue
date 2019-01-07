<template>
  <section>
    <div class="column is-6 is-offset-2">
      <h3 class="title">Login</h3>
      <p class="subtitle">Please login to proceed.</p>
      <div class="box">
        <form @submit.prevent="validateBeforeSubmit">
          <template v-if="!login">
            <b-field label="First name"
              :type="{'is-danger': errors.has('firstName')}"
              :message="errors.first('firstName')">
              <b-input
                v-model="firstName"
                name="firstName"
                v-validate="'required'"
                key="firstName-input" />
            </b-field>

            <b-field label="Last name"
              :type="{'is-danger': errors.has('lastName')}"
              :message="errors.first('lastName')">
                <b-input
                  v-model="lastName"
                  name="lastName"
                  v-validate="'required'"
                  key="lastName-input" />
            </b-field>
          </template>

          <b-field label="Email"
            :type="{'is-danger': errors.has('email')}"
            :message="errors.first('email')">
            <b-input
              v-model="email"
              name="email"
              v-validate="'required|email'"
              data-vv-as="email"
              placeholder="Your Email"
              autofocus=""
              key="email-input"/>
          </b-field>

          <b-field label="Password"
            :type="{'is-danger': errors.has('password')}"
            :message="errors.first('password')">
            <b-input
              type="password"
              v-model="password"
              name="password"
              v-validate="'required|min:8'"
              key="password-input"/>
          </b-field>

          <b-field>
            <button
              type="submit"
              class="button is-block is-info"
              @click="confirm()">
              {{login ? 'Login' : 'Create account'}}
            </button>
            <button
              type="submit"
              class="button is-text"
              @click="login = !login">
              {{login ? 'Sign Up' : 'Already have an account?'}}
            </button>
        </b-field>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { MY_USER_ID, AUTH_TOKEN } from '../constants/settings'
import { CREATE_USER_MUTATION, LOGIN_USER_MUTATION } from './mutations'
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  events: 'input|blur'
})

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
    validateBeforeSubmit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          return
        }
        this.$toast.open({
          message: 'Form is not valid! Please check the fields.',
          type: 'is-danger',
          position: 'is-bottom'
        })
      })
    },
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
          this.$router.push({ path: '/users' })
        }).catch((error) => {
          console.log(error)
          alert(error)
          this.$router.push({ path: '/login' })
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
          if (result.errors) {
            alert(result.errors)
            this.$router.push({ path: '/login' })
          } else {
            const id = result.data.createUser.user.id
            const token = result.data.createUser.token
            this.saveUserData(id, token)
          }
        }).catch((error) => {
          console.log(error)
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
