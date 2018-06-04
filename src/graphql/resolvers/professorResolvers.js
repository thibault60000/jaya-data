export default models => ({
  allProfessors: () => models.Professor.findAll({
    include: [
      { model: models.Credentials, as: 'credentials' }
    ]
  }),
  professorById: (obj, args) => models.Professor.findById(args.id, {
    include: [
      { model: models.Credentials, as: 'credentials' }
    ]
  }),
  professorByEmail: (obj, { email }) => models.Professor.findOne({
    include: [{
      model: models.Credentials,
      as: 'credentials',
      where: { email }
    }]
  })
})
