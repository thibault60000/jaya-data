import { sequelizeToPlain } from '../../utils'

export default models => ({
  createStudent: async (_, { email, password, firstName, lastName, studentNumber, specializationId }) => {
    const specialization = await models.Specialization.findById(specializationId)

    const student = await models.Student.create({
      firstName,
      lastName,
      studentNumber,
      credentials: {
        email,
        password,
        isVerified: false
      }
    }, {
      include: [{
        all: true
      }]
    })

    await student.setSpecialization(specialization)
    await student.reload()
    return sequelizeToPlain(student)
  },
  updateStudent: async (_, { id, email, firstName, lastName, studentNumber, specializationId }) => {
    const student = await models.Student.findById(
      id,
      { include: [{ all: true }] }
    )

    await Promise.all([
      student.credentials.update({
        email
      }, { returning: true }),
      student.update({
        firstName,
        lastName,
        studentNumber,
        specialization_id: specializationId
      }, { returning: true })
    ])

    return sequelizeToPlain(student)
  },
  deleteStudent: async (_, { id }) => {
    const nbDeleted = await models.Student.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'Student' }
    }

    throw new Error('Cannot delete entity')
  },
  validateStudent: async (_, { id }) => {
    const student = await models.Student.findById(
      id,
      { include: [{ all: true }] }
    )

    await student.credentials.update({
      isVerified: true
    })

    return sequelizeToPlain(student)
  }
})
