export default models => ({
  addSubjectsToSpecialization: async (_, { specializationId, subjects }) => {
    const objectsToCreate = subjects.reduce((all, { skillId, subjectId, ...item }) => ([
      ...all, {
        specialization_id: specializationId,
        skill_id: skillId,
        subject_id: subjectId,
        ...item
      }
    ]), [])

    await models.SpecializationSubject.bulkCreate(objectsToCreate)

    return models.SpecializationSubject.findAll({
      include: [
        {
          model: models.Specialization,
          as: 'specialization',
          where: { id: specializationId },
          include: [{ model: models.SchoolYear, as: 'schoolYear' }]
        },
        { model: models.Skill, as: 'skill' },
        { model: models.Subject, as: 'subject' }
      ]
    })
  },
  removeSubjectFromSpecialization: async (_, { specializationId, subjectId }) => {
    const nbDeleted = await models.SpecializationSubject.destroy({
      where: {
        specialization_id: specializationId,
        subject_id: subjectId
      }
    })

    if (nbDeleted === 1) {
      return { dataId: specializationId, entity: `SpecializationSubject + Subject ${subjectId}` }
    }

    throw new Error('Cannot delete entity')
  }
})
