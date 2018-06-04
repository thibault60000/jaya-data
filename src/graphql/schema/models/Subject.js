import ProfessorSubject from './ProfessorSubject'
import SpecializationSubject from './SpecializationSubject'
import Semester from './Semester'

const Subject = `
type Subject {
  id: ID!
  label: String!
  apogeeCode: String!
  description: String
  capacity: Int!
  semester: Semester!
  professorSubjects: [ProfessorSubject]
  specializationSubjects: [SpecializationSubject]
}
`

export default () => [Subject, ProfessorSubject, SpecializationSubject, Semester]
