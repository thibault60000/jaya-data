import Specialization from './Specialization'
import Skill from './Skill'
import Subject from './Subject'

const SpecializationSubject = `
type SpecializationSubject {
  id: ID!
  specialization: Specialization!
  skill: Skill!
  subject: Subject!
  isOptional: Boolean!
}
`

export default () => [SpecializationSubject, Specialization, Skill, Subject]
