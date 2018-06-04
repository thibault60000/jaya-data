const Credentials = `
  type Credentials {
    id: ID!
    email: String!
    password: String!
    isVerified: Boolean!
  }
`

export default () => [Credentials]
