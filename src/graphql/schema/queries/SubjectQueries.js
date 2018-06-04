const SubjectQueries = `
 extend type Query {
  allSubjects: [Subject]
  subjectById(id: ID!): Subject
 }
`

export default () => [SubjectQueries]
