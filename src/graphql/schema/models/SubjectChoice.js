import Semester from './Semester'

const SubjectChoice = `
type SubjectChoice {
  id: ID!
  rank: Int!
  student: Student!
  specializationSubject: SpecializationSubject!
}
`

export default () => [SubjectChoice, Semester]
