const SubjectMutations = `
  extend type Mutation {
    createSubject(
      label: String!
      apogeeCode: String!
      description: String
      capacity: Int
      semester: Semester
    ): Subject
    updateSubject(
      id: ID!
      label: String!
      apogeeCode: String!
      description: String
      capacity: Int
      semester: Semester
    ): Subject
    deleteSubject(id: ID!): DeletedData
  }
`

export default () => [SubjectMutations]
