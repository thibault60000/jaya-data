export default models => ({
  allSpecializationSkills: () => models.SpecializationSkill.findAll({
    include: [
      { model: models.Specialization, as: 'specialization', include: [{ model: models.SchoolYear, as: 'schoolYear' }] },
      { model: models.Skill, as: 'skill' }
    ]
  }),
  getSpecializationSkillBySpecializationId: (_, { id }) => models.SpecializationSkill.findAll({
    include: [
      {
        model: models.Specialization,
        as: 'specialization',
        where: { id },
        include: [{ model: models.SchoolYear, as: 'schoolYear' }]
      },
      { model: models.Skill, as: 'skill' }
    ]
  })
})
