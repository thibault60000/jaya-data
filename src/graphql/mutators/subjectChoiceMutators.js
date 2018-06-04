import { Op } from 'sequelize'
export default models => ({
  createInitialSubjectChoices: async (_, { studentId, semester }) => {
    const student = await models.Student.findById(studentId, {
      include: [{
        model: models.Specialization,
        as: 'specialization'
      }]
    })

    const optionalSpecializationSubjects = await models.SpecializationSubject.findAll({
      where: { is_optional: true },
      include: [
        {
          model: models.Subject,
          as: 'subject',
          required: true,
          where: { semester }
        },
        {
          model: models.Specialization,
          as: 'specialization',
          required: true,
          where: { id: student.specialization.id }
        },
        {
          model: models.Skill,
          as: 'skill',
          required: true
        }
      ]
    })

    const optionalSpecializationSubjectsBySkill = optionalSpecializationSubjects.reduce((all, item) => {
      const skillIndex = all.findIndex((skill) => skill.id === item.skill.id)
      if (skillIndex === -1) {
        return [
          ...all,
          {
            id: item.skill.id,
            specializationSubjects: [{ id: item.id }]
          }
        ]
      } else {
        all[skillIndex].specializationSubjects = [
          ...all[skillIndex].specializationSubjects,
          { id: item.id }
        ]
      }
      return all
    }, [])

    const subjectChoices = []

    for (let { specializationSubjects } of optionalSpecializationSubjectsBySkill) {
      specializationSubjects.forEach((value, index) => {
        subjectChoices.push({
          rank: index + 1,
          student_id: student.id,
          specialization_subject_id: value.id
        })
      })
    }

    await models.SubjectChoice.bulkCreate(subjectChoices)

    return models.SubjectChoice.findAll({
      include: [
        {
          model: models.SpecializationSubject,
          as: 'specializationSubject',
          required: true,
          include: [
            {
              model: models.Specialization,
              as: 'specialization'
            },
            {
              model: models.Subject,
              as: 'subject',
              where: { semester }
            },
            {
              model: models.Skill,
              as: 'skill'
            }
          ]
        },
        {
          model: models.Student,
          as: 'student',
          where: { id: studentId }
        }
      ]
    })
  },
  updateSubjectChoices: async (_, { studentId, choices }) => {
    const studentChoices = await models.SubjectChoice.findAll({
      where: {id: {[Op.in]: choices.map(x => x.id)}},
      include: [
        {
          model: models.SpecializationSubject,
          as: 'specializationSubject',
          required: true,
          include: [
            {
              model: models.Specialization,
              as: 'specialization'
            },
            {
              model: models.Subject,
              as: 'subject'
            },
            {
              model: models.Skill,
              as: 'skill'
            }
          ]
        },
        {
          model: models.Student,
          as: 'student'
        }
      ]
    })

    const updateOperations = studentChoices.map(choice => {
      const {rank} = choices.find(x => parseInt(x.id, 10) === parseInt(choice.id, 10))
      return choice.update({
        rank
      }, {
        returning: true
      })
    })

    return Promise.all(updateOperations)
  }
})
