const SubjectChoicesVersionMutations = `
  extend type Mutation {
    setSubjectChoicesVersionAsActive (id: ID!): SubjectChoicesVersion
    deleteSubjectChoicesVersion (id: ID!): DeletedData
  }
`

export default () => [SubjectChoicesVersionMutations]
