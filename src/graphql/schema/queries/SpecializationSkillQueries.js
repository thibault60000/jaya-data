const SpecializationSkillQueries = `
extend type Query {
  allSpecializationSkills: [SpecializationSkill]
  getSpecializationSkillBySpecializationId(id: ID!): [SpecializationSkill]
}
`

export default () => [SpecializationSkillQueries]
