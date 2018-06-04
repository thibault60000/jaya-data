export default models => ({
  allSubjectChoicesVersions: () => models.SubjectChoicesVersion.findAll({
    include: [
      {
        model: models.SchoolYear,
        as: 'schoolYear',
        required: true
      },
      {
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
      }
    ]
  }),
  subjectChoicesVersionById: (_, { id }) => models.SubjectChoicesVersion.findById(id, {
    include: [{
      model: models.SubjectChoice,
      as: 'choices',
      required: true,
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
          include: [{
            model: models.Specialization,
            as: 'specialization'
          }]
        }
      ]
    }]
  }),
  subjectChoicesVersionsBySchoolYearAndSemester: (_, { schoolYearId, semester }) => models.SubjectChoicesVersion.findAll({
    where: { semester, school_year_id: schoolYearId },
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
})
