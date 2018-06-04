const SpecializationSubjectQueries = `
  extend type Query {
    allSpecializationSubjects: [SpecializationSubject]
    getSpecializationSubjectBySpecializationId(id: ID!): [SpecializationSubject]
  }
`

export default () => [SpecializationSubjectQueries]
