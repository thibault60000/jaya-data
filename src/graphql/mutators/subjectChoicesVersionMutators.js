import sequelize from 'sequelize'

const Op = sequelize.Op

export default models => ({
  setSubjectChoicesVersionAsActive: async (_, { id }) => {
    const subjectChoicesVersion = await models.SubjectChoicesVersion.findById(id, {
      include: [{
        model: models.SubjectChoice,
        as: 'choices',
        include: [
          {
            model: models.SpecializationSubject,
            as: 'specializationSubject',
            include: [
              {
                model: models.Subject,
                as: 'subject'
              },
              {
                model: models.Specialization,
                as: 'specialization'
              },
              {
                model: models.Skill,
                as: 'skill'
              }
            ]
          },
          {
            model: models.Student,
            as: 'student',
            include: [
              {
                model: models.Specialization,
                as: 'specialization'
              }
            ]
          }
        ]
      }]
    })

    const currentlyActive = await models.SubjectChoicesVersion.findAll({
      where: {
        id: { [Op.not]: subjectChoicesVersion.id },
        semester: subjectChoicesVersion.semester,
        school_year_id: subjectChoicesVersion.school_year_id,
        isActive: true
      }
    })

    if (currentlyActive.length > 0) {
      const promises = []
      for (let activeVersion of currentlyActive) {
        promises.push(activeVersion.update({ isActive: false }))
      }

      await Promise.all(promises)
    }

    return subjectChoicesVersion.update({ isActive: true })
  },
  deleteSubjectChoicesVersion: async (_, { id }) => {
    const subjectChoicesVersion = await models.SubjectChoicesVersion.findById(id)

    if (!subjectChoicesVersion.isActive) {
      await subjectChoicesVersion.destroy()
      return {dataId: id, entity: 'SubjectChoicesVersion'}
    }

    throw new Error('Cannot delete entity')
  }
})
