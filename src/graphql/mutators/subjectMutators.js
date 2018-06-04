export default models => ({
  createSubject: async (_, { label, apogeeCode, description, capacity, semester }) => {
    const subject = await models.Subject.create({
      label,
      apogeeCode,
      description,
      capacity,
      semester
    })

    return subject.reload()
  },
  updateSubject: async (_, { id, label, apogeeCode, description, capacity, semester }) => {
    const [, [subject]] = await models.Subject.update({
      label,
      apogeeCode,
      description,
      capacity,
      semester
    }, {
      where: { id },
      returning: true
    })

    return subject.reload()
  },
  deleteSubject: async (_, { id }) => {
    const nbDeleted = await models.Subject.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'Subject' }
    }

    throw new Error('Cannot delete entity')
  }
})
