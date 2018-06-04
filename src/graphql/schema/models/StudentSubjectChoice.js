import Student from './Student'
import SpecializationSubject from './SpecializationSubject'

const StudentSubjectChoice = `
  type StudentSubjectChoice {
    rank: Int!
    allowed: Boolean
    student: Student!
    specializationSubject: SpecializationSubject!
  }
`

export default () => [StudentSubjectChoice, Student, SpecializationSubject]
