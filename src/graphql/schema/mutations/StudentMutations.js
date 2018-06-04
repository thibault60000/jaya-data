const StudentMutation = `
  extend type Mutation {
    createStudent(
      email: String!,
      password: String!,
      firstName: String!,
      lastName: String!,
      studentNumber: String!,
      specializationId: ID!
    ): Student
    
    updateStudent(
      id: ID!,
      email: String!,
      firstName: String!,
      lastName: String!,
      studentNumber: String!,
      specializationId: ID!
    ): Student
    
    deleteStudent (id: ID!): DeletedData
    validateStudent(
      id: ID!
    ): Student
  }
`

export default () => [StudentMutation]
