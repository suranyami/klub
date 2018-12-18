import gql from 'graphql-tag'

export const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!
  ) {
    createUser(
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      password: $password
    ) {
      user {
        id
      }
      token
    }
  }
`

export const LOGIN_USER_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(
      email: $email,
      password: $password
    ) {
      token
      user {
        id
      }
    }
  }
`
