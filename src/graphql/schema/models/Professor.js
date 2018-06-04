import Credentials from './Credentials'
import ProfessorSubject from './ProfessorSubject'

const Professor = `
type Professor implements Person {
  id: ID!
  firstName: String!
  lastName: String!
  credentials: Credentials!
  professorSubjects: [ProfessorSubject]
}
`

export default () => [Professor, Credentials, ProfessorSubject]
