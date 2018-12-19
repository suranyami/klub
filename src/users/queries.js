import gql from 'graphql-tag'

export const LIST_USERS_QUERY = gql`
  query ListUsersMutation {
    users {
      id
      firstName
      lastName
      email
    }
  }
`
