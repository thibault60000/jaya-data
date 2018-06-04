import SubjectChoice from './SubjectChoice'

const SubjectChoicesVersion = `
type SubjectChoicesVersion {
  id: ID!
  date: String!
  isActive: Boolean!
  semester: Semester
  schoolYear: SchoolYear
  choices: [SubjectChoice]
}
`
export default () => [SubjectChoicesVersion, SubjectChoice]
