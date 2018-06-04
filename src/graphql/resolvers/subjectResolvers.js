export default models => ({
  allSubjects: () => models.Subject.findAll(),
  subjectById: (_, { id }) => models.Subject.findById(id)
})
