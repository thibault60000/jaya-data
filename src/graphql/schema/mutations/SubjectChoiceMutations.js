const SubjectChoiceMutations = `
  input ChoicesParams {
    id: ID!
    rank: Int!
  }

  extend type Mutation {
    createInitialSubjectChoices(
      studentId: ID!
      semester: Semester
    ): [SubjectChoice]
    updateSubjectChoices(
      studentId: ID!
      choices: [ChoicesParams]
    ): [SubjectChoice]
  }
`

export default () => [SubjectChoiceMutations]
