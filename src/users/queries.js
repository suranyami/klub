import gql from 'graphql-tag'

export const LIST_USERS_QUERY = gql`
  query ListUsers {
    users {
      id
      firstName
      lastName
      email
    }
  }
`

export const PAGINATED_USER_LIST = gql`
query ListUsersPage (
  $page: Int!,
  $pageSize: Int!,
  $sortBy: String!,
  $sortOrder: String!
) {
  usersPage(
    page: $page,
    pageSize: $pageSize,
    sortBy: $sortBy,
    sortOrder: $sortOrder) {
    entries {
      id
      firstName
      lastName
      email
    }
    pageNumber
    pageSize
    totalPages
    totalEntries
  }
}
`
