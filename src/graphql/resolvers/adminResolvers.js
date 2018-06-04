export default models => ({
  allAdmins: () => models.Admin.findAll({
    include: [{ model: models.Credentials, as: 'credentials' }]
  }),
  adminById: (obj, args) => models.Admin.findById(args.id),
  adminByEmail: (obj, { email }) => models.Admin.findOne({
    include: [{
      model: models.Credentials,
      as: 'credentials',
      where: { email }
    }]
  })
})
