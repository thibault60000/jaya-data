import { sequelizeToPlain } from '../../utils'

export default models => ({
  createAdmin: async (_, { email, password }) =>
    models.Admin.create({
      credentials: {
        email,
        password,
        isVerified: true
      }
    }, {
      include: [{
        model: models.Credentials,
        as: 'credentials'
      }]
    }),
  updateAdmin: async (_, { id, email }) => {
    const admin = await models.Admin.findById(
      id,
      { include: [{ all: true }] }
    )

    admin.credentials.update({
      email
    }, { returning: true })

    return sequelizeToPlain(admin)
  },
  deleteAdmin: async (_, { id }) => {
    const nbDeleted = await models.Admin.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'Admin' }
    }

    throw new Error('Cannot delete entity')
  },
})
