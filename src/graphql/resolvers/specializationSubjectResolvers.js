export default models => ({
  allSpecializationSubjects: () => models.SpecializationSubject.findAll({
    include: [
      { model: models.Specialization, as: 'specialization', include: [{ model: models.SchoolYear, as: 'schoolYear' }] },
      { model: models.Skill, as: 'skill' },
      { model: models.Subject, as: 'subject' }
    ]
  }),
  getSpecializationSubjectBySpecializationId: (_, { id }) => models.SpecializationSubject.findAll({
    include: [
      {
        model: models.Specialization,
        as: 'specialization',
        where: { id },
        include: [{ model: models.SchoolYear, as: 'schoolYear' }]
      },
      { model: models.Skill, as: 'skill' },
      { model: models.Subject, as: 'subject' }
    ]
  })
})
