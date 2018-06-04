export default models => ({
  createSkill: (_, { label }) => models.Skill.create({ label }),
  updateSkill: async (_, { id, label }) => {
    const skill = await models.Skill.findById(id)
    return skill.update({
      label
    })
  },
  deleteSkill: async (_, { id }) => {
    const nbDeleted = await models.Skill.destroy({
      where: { id }
    })

    if (nbDeleted === 1) {
      return { dataId: id, entity: 'Skill' }
    }

    throw new Error('Cannot delete entity')
  }
})
