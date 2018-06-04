const SubjectGroupMutations = `
  extend type Mutation {
    createGroup (
      type: GroupType
      label: String!
      subjectId: ID!
      studentIds: [ID!]
    ): SubjectGroup
    updateGroup (
      id: ID!
      type: GroupType
      label: String!
      subjectId: ID!
      studentIds: [ID!]
    ): SubjectGroup
    deleteGroup (id: ID!): DeletedData
  }
`

export default () => [SubjectGroupMutations]
