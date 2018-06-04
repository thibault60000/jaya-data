
export default models => ({
  addSkillToSpecialization: async (_, { specializationId, skills }) => {
    const objectsToCreate = skills.reduce((all, { skillId, optionalSubjectsNb }) => ([
      ...all, {
        specialization_id: specializationId,
        skill_id: skillId,
        optionalSubjectsNb
      }
    ]), [])

    await models.SpecializationSkill.bulkCreate(objectsToCreate)

    return models.SpecializationSkill.findAll({
      include: [
        {
          model: models.Specialization,
          as: 'specialization',
          where: { id: specializationId },
          include: [{ model: models.SchoolYear, as: 'schoolYear' }]
        },
        { model: models.Skill, as: 'skill' }
      ]
    })
  },
  removeSkillFromSpecialization: async (_, { specializationId, skillId }) => {
    const nbDeleted = await models.SpecializationSkill.destroy({
      where: {
        specialization_id: specializationId,
        skill_id: skillId
      }
    })

    if (nbDeleted === 1) {
      return { dataId: specializationId, entity: `SpeciaizationSkill + Skill ${skillId}` }
    }

    throw new Error('Cannot delete entity')
  }
})
