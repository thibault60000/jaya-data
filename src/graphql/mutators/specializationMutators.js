import { sequelizeToPlain } from '../../utils'

export default models => ({
  createSpecialization: async (_, {
    label,
    acronym,
    schoolYearId,
    openingChoiceDateS1,
    closingChoiceDateS1,
    openingChoiceDateS2,
    closingChoiceDateS2
  }) => {
    console.log(openingChoiceDateS1)
    console.log(closingChoiceDateS1)
    console.log(openingChoiceDateS2)
    console.log(closingChoiceDateS2)
    const specialization = await models.Specialization.create({
      label,
      acronym,
      school_year_id: schoolYearId,
      openingChoiceDateS1,
      closingChoiceDateS1,
      openingChoiceDateS2,
      closingChoiceDateS2
    })

    return sequelizeToPlain(await specialization.reload({
      include: [{ model: models.SchoolYear, as: 'schoolYear' }]
    }))
  },
  updateSpecialization: async (_, {
    id,
    label,
    acronym,
    schoolYearId,
    openingChoiceDateS1,
    closingChoiceDateS1,
    openingChoiceDateS2,
    closingChoiceDateS2
  }) => {
    const specialization = await models.Specialization.findById(id, {
      include: [{ model: models.SchoolYear, as: 'schoolYear' }]
    })

    await specialization.update({
      label,
      acronym,
      school_year_id: schoolYearId,
      openingChoiceDateS1,
      closingChoiceDateS1,
      openingChoiceDateS2,
      closingChoiceDateS2
    })

    return sequelizeToPlain(await specialization.reload({
      include: [{ model: models.SchoolYear, as: 'schoolYear' }]
    }))
  },
  deleteSpecialization: async (_, { id }) => {
    const nbDeleted = await models.Specialization.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'Specialization' }
    }

    throw new Error('Cannot delete entity')
  }
})
