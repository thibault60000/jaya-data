import Professor from './Professor'
import Subject from './Subject'

const ProfessorSubject = `
type ProfessorSubject {
  id: ID!
  tutorialHoursPerGroup: Int
  lectureHours: Int
  professor: Professor
  subject: Subject
}
`

export default () => [ProfessorSubject, Professor, Subject]
