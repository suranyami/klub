<template lang="pug">
  #container.container
    div(v-if='usersPage')
      b-table(
          :data='usersPage.entries'
          :loading='loading'
          :striped='true'
          :bordered='true'
          :narrowed='true'
          paginated
          backend-pagination
          backend-sorting
          :total='totalEntries'
          :per-page='pageSize'
          @page-change='onPageChange'
          :default-sort-direction='defaultSortOrder'
          :default-sort='[sortBy, sortOrder]'
          @sort='onSort')
        template(slot-scope='props')
          b-table-column(field='email' label='Email' sortable='')
            | {{ props.row.email }}

          b-table-column(field='firstName' label='First Name' sortable='')
            | {{ props.row.firstName }}

          b-table-column(field='lastName' label='Last Name' sortable='')
            | {{ props.row.lastName }}
</template>

<script>
import { PAGINATED_USER_LIST } from './queries'

export default {
  name: 'List',
  mounted () {
    this.loadEntries()
  },
  data () {
    return {
      usersPage: {
        entries: []
      },
      totalEntries: 0,
      totalPages: 1,
      sortBy: 'email',
      sortOrder: 'asc',
      page: 0,
      pageSize: 15,
      loading: false,
      defaultSortOrder: 'asc'
    }
  },
  methods: {
    onPageChange (page) {
      this.page = page
      this.loadEntries()
    },
    onSort (field, order) {
      this.sortBy = field
      this.sortOrder = order
      this.loadEntries()
    },
    loadEntries () {
      this.$apollo.query({
        query: PAGINATED_USER_LIST,
        variables: {
          sortBy: this.sortBy,
          sortOrder: this.sortOrder,
          page: this.page,
          pageSize: this.pageSize
        }
      }).then((result) => {
        this.usersPage = result.data.usersPage
        this.totalEntries = result.data.usersPage.totalEntries
        this.totalPages = result.data.usersPage.totalPages
      }).catch((error) => {
        alert(error)
      })
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/main.scss';
</style>
