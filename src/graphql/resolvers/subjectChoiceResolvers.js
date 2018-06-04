export default models => ({
  allSubjectChoices: () => models.SubjectChoice.findAll(),
  subjectChoicesByUserAndSemester: (_, { studentId, semester }) => models.SubjectChoice.findAll({
    include: [
      {
        model: models.SpecializationSubject,
        as: 'specializationSubject',
        required: true,
        include: [
          {
            model: models.Specialization,
            as: 'specialization'
          },
          {
            model: models.Subject,
            as: 'subject',
            where: { semester }
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
        where: { id: studentId }
      }
    ]
  }),
  subjectChoicesBySchoolYearAndSemester: (_, { schoolYearId, semester }) => models.SubjectChoice.findAll({
    include: [
      {
        model: models.SpecializationSubject,
        as: 'specializationSubject',
        required: true,
        include: [
          {
            model: models.Specialization,
            as: 'specialization'
          },
          {
            model: models.Subject,
            as: 'subject',
            where: { semester }
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
        required: true,
        include: [
          {
            model: models.Specialization,
            as: 'specialization',
            required: true,
            include: [{
              model: models.SchoolYear,
              as: 'schoolYear',
              where: { id: schoolYearId }
            }]
          }
        ]
      }
    ]
  })
})
