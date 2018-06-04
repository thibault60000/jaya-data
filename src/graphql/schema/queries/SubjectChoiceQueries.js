const SubjectChoiceQueries = `
extend type Query {
  allSubjectChoices: [SubjectChoice]
  subjectChoicesByUserAndSemester(
    studentId: ID!
    semester: Semester!
  ): [SubjectChoice]
  subjectChoicesBySchoolYearAndSemester(
    schoolYearId: ID!
    semester: Semester!
  ): [SubjectChoice]
}
`

export default () => [SubjectChoiceQueries]
