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

// const wsUri = `${process.env.WS_SCHEME}://${process.env.SERVER_DOMAIN}/api/graphql`
// console.log(wsUri)
//
// const absintheSocket = AbsintheSocket.create(
//   new PhoenixSocket(wsUri)
// )
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

console.log(process.env.VUE_APP_SERVER_SCHEME)
console.log(process.env.VUE_APP_SERVER_DOMAIN)
console.log(process.env.VUE_APP_SECRET)

const serverUri = `${process.env.VUE_APP_SERVER_SCHEME}://${process.env.VUE_APP_SERVER_DOMAIN}/api/graphql`
console.log(serverUri)
console.log('*********************************************************')

const httpLink = new HttpLink({
  uri: serverUri,
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

new Vue({
  router,
  apolloProvider,
  data: {
    userId
  },
  render: h => h(App)
}).$mount('#app')

/* eslint-disable no-new */
