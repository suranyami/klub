<template>
  <div class="content">
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.email }}
      </li>
    </ul>
</div>
</template>

<script>
import { LIST_USERS_QUERY } from './queries'

export default {
  name: 'List',
  data () {
    return {
      users: [
        {id: 1, email: 'test@example.com'}
      ]
    }
  },
  apollo: {
    users: LIST_USERS_QUERY
  }
}
</script>

<style lang="scss">
  @import '@/assets/main.scss';
</style>
