const StudentQueries = `
input StudentFilterCriterias {
  schoolYearIds: [ID]
  specializationIds: [ID]
  groupIds: [ID]
  subjectIds: [ID]
}

extend type Query {
  allStudents: [Student]
  studentById(id: ID!): Student
  studentByEmail(email: String): Student
  studentsByEmail(email: String): [Student]
  studentsBySpecialization(id: ID!): [Student]
  studentsByCriterias(criterias: StudentFilterCriterias): [Student]
  studentsBySubject(subjectId: ID!, withoutGroupStudent: Boolean): [Student]
}
`

export default () => [StudentQueries]
