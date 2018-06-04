const ProfessorMutations = `
  extend type Mutation {
    createProfessor(
      email: String!,
      password: String!,
      firstName: String!,
      lastName: String!
    ): Professor
    
    updateProfessor(
      id: ID!,
      email: String!,
      firstName: String!,
      lastName: String!
    ): Student
    
    deleteProfessor (id: ID!): DeletedData
    
    validateProfessor(
      id: ID!
    ): Professor
  }
`

export default () => [ProfessorMutations]
