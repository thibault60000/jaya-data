import { sequelizeToPlain } from '../../utils'

export default models => ({
  allSpecializations: async () => {
    const specializations = await models.Specialization.findAll({
      include: [
        { model: models.SchoolYear, as: 'schoolYear' },
        { model: models.Skill, as: 'skills', through: { attributes: ['optionalSubjectsNb'] } }
      ]
    })
    return sequelizeToPlain(specializations)
  },
  specializationById: (obj, { id }) => models.Specialization.findById(id, {
    include: [
      { model: models.SchoolYear, as: 'schoolYear' },
      { model: models.Skill, as: 'skills', through: { attributes: ['optionalSubjectsNb'] } }
    ]
  }),
  specializationsBySchoolYear: (obj, { id }) => models.Specialization.findAll({
    include: [
      {
        model: models.SchoolYear,
        as: 'schoolYear',
        where: { id }
      },
      { model: models.Skill, as: 'skills', through: { attributes: ['optionalSubjectsNb'] } }
    ]
  })
})
