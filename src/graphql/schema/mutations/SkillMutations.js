const SkillMutations = `
  extend type Mutation {
    createSkill(
      label: String!
    ): Skill
    updateSkill(
      id: ID,
      label: String!
    ): Skill
    deleteSkill(id: ID!): DeletedData
  }
`

export default () => [SkillMutations]
