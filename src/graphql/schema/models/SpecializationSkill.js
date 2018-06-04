import Specialization from './Specialization'
import Skill from './Skill'

const SpecializationSkill = `
type SpecializationSkill {
  optionalSubjectsNb: Int!
  specialization: Specialization
  skill: Skill
}
`

export default () => [SpecializationSkill, Specialization, Skill]
