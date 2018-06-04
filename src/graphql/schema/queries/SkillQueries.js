const SkillQueries = `
 extend type Query {
  allSkills: [Skill]
  skillById(id: ID!): Skill
  
 }
`

export default () => [SkillQueries]
