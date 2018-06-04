const SubjectGroupQueries = `
  extend type Query {
    allSubjectGroups: [SubjectGroup]
    subjectGroupById(id: ID!): SubjectGroup
  }
`

export default () => [SubjectGroupQueries]
