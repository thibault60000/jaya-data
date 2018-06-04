const SubjectChoicesVersionQueries = `
extend type Query {
  allSubjectChoicesVersions: [SubjectChoicesVersion]
  subjectChoicesVersionById(id: ID!): SubjectChoicesVersion
  subjectChoicesVersionsBySchoolYearAndSemester(
    schoolYearId: ID!
    semester: Semester
  ): [SubjectChoicesVersion]
}
`

export default () => [SubjectChoicesVersionQueries]
