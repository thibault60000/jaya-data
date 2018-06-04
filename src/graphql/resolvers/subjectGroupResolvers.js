export default models => ({
  allSubjectGroups: () => models.SubjectGroup.findAll({
    include: [
      {
        model: models.Subject,
        as: 'subject'
      },
      {
        model: models.Student,
        as: 'students',
        include: [{
          model: models.Specialization,
          as: 'specialization',
          include: [{
            model: models.SchoolYear,
            as: 'schoolYear'
          }]
        }]
      }
    ]
  }),
  subjectGroupById: (_, { id }) => models.SubjectGroup.findById(id, {
    include: [
      {
        model: models.Subject,
        as: 'subject'
      },
      {
        model: models.Student,
        as: 'students',
        include: [{
          model: models.Specialization,
          as: 'specialization',
          include: [{
            model: models.SchoolYear,
            as: 'schoolYear'
          }]
        }]
      }
    ]
  })
})
