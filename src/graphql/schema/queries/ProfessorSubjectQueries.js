const ProfessorSubjectQueries = `
 extend type Query {
  allProfessorSubjects: [ProfessorSubject]
 }
`

export default () => [ProfessorSubjectQueries]
