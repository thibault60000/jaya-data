export default models => ({
  createGroup: async (_, { type, label, subjectId, studentIds }) => {
    const group = await models.SubjectGroup.create({
      label,
      type,
      subject_id: subjectId
    })

    await models.StudentSubjectGroup.bulkCreate(
      studentIds.map(sid => ({
        group_id: group.id,
        student_id: sid
      }))
    )

    return models.SubjectGroup.findById(group.id, {
      include: [
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
  },
  updateGroup: async (_, { id, type, label, subjectId, studentIds }) => {
    // Empty Group First
    const group = await models.SubjectGroup.findById(id, {
      include: [
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

    await models.StudentSubjectGroup.destroy({
      where: { group_id: id }
    })

    await Promise.all([
      await models.StudentSubjectGroup.bulkCreate(
        studentIds.map(sid => ({
          group_id: id,
          student_id: sid
        }))
      ),
      await group.update({ label, type })
    ])

    return group.reload()
  },
  deleteGroup: async (_, { id }) => {
    const nbDeleted = await models.SubjectGroup.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'SubjectGroup' }
    }

    throw new Error('Cannot delete entity')
  }
})
