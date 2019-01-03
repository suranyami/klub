// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import VueApollo from 'vue-apollo'

// import { ApolloLink } from 'apollo-link'
// import { hasSubscription } from '@jumpn/utils-graphql'
// import * as AbsintheSocket from '@absinthe/socket'
// import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
// import { Socket as PhoenixSocket } from 'phoenix'

import App from './App'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import router from './router'

import { MY_USER_ID, AUTH_TOKEN } from './constants/settings'

require('./assets/main.scss')

// const absintheSocket = AbsintheSocket.create(
//   new PhoenixSocket('ws://localhost:4000/socket')
// )
//
// const absintheSocketLink = createAbsintheSocketLink(absintheSocket)
//
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/api/graphql',
  credentials: 'same-origin'
})

// const basicLink = new ApolloLink().split(
//   operation => hasSubscription(operation.query),
//   absintheSocketLink,
//   httpLink
// )

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  connectToDevTools: true,
  cache
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(Buefy, {
  defaultIconPack: 'fas',
  defaultContainerElement: '#content'
})
Vue.use(VueApollo)

Vue.config.productionTip = false

let userId = localStorage.getItem(MY_USER_ID)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  apolloProvider,
  data: {
    userId
  },
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
