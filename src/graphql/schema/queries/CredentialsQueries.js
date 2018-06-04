const CredentialsQueries = `
 extend type Query {
  allCredentials: [Credentials],
  credentialsByEmail(email: [String]): Credentials,
  credentials: Credentials
 }
`

export default () => [CredentialsQueries]
