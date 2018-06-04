const AlgorithmMutations = `
  input AlgorithmParams {
    schoolYearId: ID!
    semester: Semester
  }
  
  extend type Mutation {
    runAlgorithm(params: AlgorithmParams): SubjectChoicesVersion
  }
`

export default () => [AlgorithmMutations]
