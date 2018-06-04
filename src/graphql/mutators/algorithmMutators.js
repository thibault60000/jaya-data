import algorithm from '../../utils/algorithm'
import moment from 'moment-timezone'

export default models => ({
  runAlgorithm: async (_, { params }) => {
    const { schoolYearId, semester } = params

    const {
      students,
      results,
      subjectsStatus
    } = await algorithm({ models, schoolYearId, semester })

    const today = moment(Date.now()).tz('Europe/Paris').toISOString()

    const version = await models.SubjectChoicesVersion.create({
      date: today,
      isActive: false,
      semester,
      school_year_id: schoolYearId
    })

    await models.SubjectChoiceResultSet.bulkCreate([
      ...results.reduce((all, item) => [
        ...all,
        ...item.choices.map(y => ({
          subject_choices_version_id: version.id,
          subject_choice_id: y.id
        }))
      ], [])
    ])

    return models.SubjectChoicesVersion.findById(version.id, {
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
  }
})
