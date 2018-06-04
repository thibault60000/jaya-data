export default models => ({
  allSkills: () => models.Skill.findAll(),
  skillById: (_, { id }) => models.Skill.findById(id)
})
