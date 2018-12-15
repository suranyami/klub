<template>
  <div class="container has-text-centered">
    <div class="column is-4 is-offset-4">
      <h3 class="title">Login</h3>
      <p class="subtitle">Please login to proceed.</p>
      <div class="box">
        <form>
          <div class="field">
            <div class="control">
              <input
                v-show="!login"
                v-model="name"
                type="text"
                placeholder="Your name">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                v-model="email"
                class="input is-large"
                type="email"
                placeholder="Your Email"
                autofocus="">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                v-model="password"
                class="input is-large"
                type="password"
                placeholder="Your Password">
            </div>
          </div>

          <div class="field">
            <label class="checkbox">
              <input type="checkbox"/> Remember me
            </label>
          </div>

          <button
            class="button is-block is-info is-large is-fullwidth"
            @click="confirm()">
            {{login ? 'Login' : 'create account'}}
          </button>
        </form>
      </div>

      <div class="tabs has-text-centered">
        <router-link to="/register">Register</router-link>
        <router-link to="/forgot">Forgot Password</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { USER_ID, AUTH_TOKEN } from '../constants/settings'

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(
      name: $name,
      authProvider: {
        email: {
          email: $email,
          password: $password
        }
      }
    ) {
      id
    }

    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      login: true,
      name: '',
      password: ''
    }
  },
  methods: {
    confirm () {
      const { name, email, password } = this.$data
      if (this.login) {
        this.$apollo.mutate({
          mutation: SIGNIN_USER_MUTATION,
          variables: {
            email,
            password
          }
        }).then((result) => {
          const id = result.data.signinUser.user.id
          const token = result.data.signinUser.token
          this.saveUserData(id, token)
        }).catch((error) => {
          alert(error)
        })
      } else {
        this.$apollo.mutate({
          mutation: CREATE_USER_MUTATION,
          variables: {
            name,
            email,
            password
          }
        }).then((result) => {
          const id = result.data.signinUser.user.id
          const token = result.data.signinUser.token
          this.saveUserData(id, token)
        }).catch((error) => {
          alert(error)
        })
      }
      this.$router.push({path: '/'})
    },
    saveUserData (id, token) {
      localStorage.setItem(USER_ID, id)
      localStorage.setItem(AUTH_TOKEN, token)
      this.$root.$data.userId = localStorage.getItem(AUTH_TOKEN)
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
