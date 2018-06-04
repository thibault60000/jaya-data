const SpecializationSkillMutations = `
  input SkillsPropertiesInput {
    skillId: ID!
    optionalSubjectsNb: Int!
  }

  extend type Mutation {
    addSkillToSpecialization(
      specializationId: ID!
      skills: [SkillsPropertiesInput]
    ): [SpecializationSkill]

    removeSkillFromSpecialization(
      specializationId: ID!
      skillId: ID!
    ): DeletedData
  }
`

export default () => [SpecializationSkillMutations]
