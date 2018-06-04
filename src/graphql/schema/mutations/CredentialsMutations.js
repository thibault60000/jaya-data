const CredentialsMutations = `
  extend type Mutation {
    adminSetPassword(
      credentialsId: ID!
      password: String
    ): Credentials
  }
`

export default () => [CredentialsMutations]
