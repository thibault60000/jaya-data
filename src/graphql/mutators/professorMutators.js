import { sequelizeToPlain } from '../../utils'

export default models => ({
  createProfessor: async (_, { email, password, firstName, lastName }) =>
    models.Professor.create({
      firstName,
      lastName,
      credentials: {
        email,
        password,
        isVerified: false
      }
    }, {
      include: [{
        model: models.Credentials,
        as: 'credentials'
      }]
    }),
  updateProfessor: async (_, { id, email, firstName, lastName }) => {
    const professor = await models.Professor.findById(
      id,
      { include: [{ all: true }] }
    )

    await Promise.all([
      professor.credentials.update({
        email
      }, { returning: true }),
      professor.update({
        firstName,
        lastName
      }, { returning: true })
    ])

    return sequelizeToPlain(professor)
  },
  deleteProfessor: async (_, { id }) => {
    const nbDeleted = await models.Professor.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'Professor' }
    }

    throw new Error('Cannot delete entity')
  },
  validateProfessor: async (_, { id }) => {
    const professor = await models.Professor.findById(
      id,
      { include: [{ all: true }] }
    )

    await professor.credentials.update({
      isVerified: true
    })

    return sequelizeToPlain(professor)
  }
})
