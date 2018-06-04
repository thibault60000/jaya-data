const Mutation = `
  type Mutation {
    goodByeWorld(message: String!): String
  }
`

export default () => [Mutation]
