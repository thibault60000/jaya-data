const AdminMutations = `
  extend type Mutation {
    createAdmin (
      email: String!,
      password: String!,
    ): Admin
    updateAdmin (
      id: ID!,
      email: String!
    ): Student
    deleteAdmin (id: ID!): DeletedData
  }
`

export default () => [AdminMutations]
