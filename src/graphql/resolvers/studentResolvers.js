import { sequelizeToPlain } from '../../utils'
import { Op } from 'sequelize'

export default models => ({
  allStudents: async () => {
    const students = await models.Student.findAll({
      include: [
        { model: models.SubjectGroup, as: 'groups' },
        { model: models.Specialization, as: 'specialization' },
        { model: models.Credentials, as: 'credentials' }
      ]
    })

    return sequelizeToPlain(students)
  },
  studentById: (obj, args) => models.Student.findById(args.id, {
    include: [
      { model: models.Credentials, as: 'credentials' },
      { model: models.Specialization, as: 'specialization' }
    ]
  }),
  studentByEmail: (obj, { email }) => models.Student.findOne({
    include: [{
      model: models.Credentials,
      as: 'credentials',
      where: { email }
    },
    { model: models.Specialization, as: 'specialization' }]
  }),
  studentsByEmail: (obj, { email }) => models.Student.findAll({
    include: [{
      model: models.Credentials,
      as: 'credentials',
      where: { email }
    },
    { model: models.Specialization, as: 'specialization' }]
  }),
  studentsBySpecialization: (obj, { id }) => models.Student.findAll({
    include: [{
      model: models.Specialization, as: 'specialization', where: { id }
    },
    { model: models.Credentials, as: 'credentials' }]
  }),
  studentsByCriterias: async (_, { criterias }) => {
    const { schoolYearIds, specializationIds, groupIds, subjectIds } = criterias
    let requests = []

    if (schoolYearIds != null && schoolYearIds.length > 0) {
      requests = [
        ...requests,
        models.Student.findAll({
          include: [{
            model: models.Specialization,
            as: 'specialization',
            where: { 'school_year_id': { [Op.in]: schoolYearIds } }
          }]
        })
      ]
    }

    if (specializationIds != null && specializationIds.length > 0) {
      requests = [
        ...requests,
        models.Student.findAll({
          include: [{
            model: models.Specialization,
            as: 'specialization',
            where: { id: { [Op.in]: specializationIds } }
          }]
        })
      ]
    }

    if (groupIds != null && groupIds.length > 0) {
      requests = [
        ...requests,
        models.Student.findAll({
          include: [{
            model: models.SubjectGroup,
            as: 'groups',
            where: { id: { [Op.in]: groupIds } }
          }]
        })
      ]
    }

    if (subjectIds != null && subjectIds > 0) {
      requests = [
        ...requests,
        models.Student.findAll({
          include: [
            {
              model: models.Specialization,
              as: 'specialization',
              required: true,
              include: [{
                model: models.Subject,
                through: {
                  where: { is_optional: false }
                },
                as: 'subjects',
                where: { id: { [Op.in]: subjectIds } },
                required: true
              }]
            }
          ]
        }),
        models.SubjectChoicesVersion.findAll({
          where: {is_active: true},
          include: [{
            model: models.SubjectChoice,
            as: 'choices',
            required: true,
            include: [
              {
                model: models.SpecializationSubject,
                as: 'specializationSubject',
                include: [{
                  model: models.Subject,
                  as: 'subject',
                  where: { id: { [Op.in]: subjectIds } },
                  required: true
                }],
                required: true
              },
              {
                model: models.Student,
                as: 'student',
                required: true,
                include: [{
                  model: models.Specialization,
                  as: 'specialization',
                  required: true
                }]
              }
            ]
          }]
        }).then(versions => versions.reduce((all, item) => ([
          ...all,
          ...item.choices
            .reduce((students, choice) => {
              const stdIndex = students.findIndex(x => x.id === choice.student.id)
              return stdIndex === -1 ? [...students, choice.student] : students
            }, [])
            .filter(student => !all.map(x => x.id).includes(student.id))
        ]), []))
      ]
    }

    if (requests.length > 0) {
      const responses = await Promise.all(requests)
      return responses.reduce((students, items) => {
        const newItems = items.filter((std) => !students.map(s => s.id).includes(std.id))
        return [...students, ...newItems]
      }, [])
    }
    return []
  },
  studentsBySubject: async (_, { subjectId, withoutGroupStudent }) => {
    let [studentSubjectGroup, mandatoryStudents, optionalStudents] = await Promise.all([
      // Les étudiants déjà dans un groupe sur cette UE,
      models.SubjectGroup.findAll({
        include: [
          {
            model: models.Subject,
            as: 'subject',
            where: { id: subjectId },
            required: true
          },
          {
            model: models.Student,
            as: 'students',
            required: true
          }
        ]
      }),
      // Les étudiants qui ont obligatoirement cette UE dans leur parcours
      models.Student.findAll({
        include: [
          {
            model: models.Specialization,
            as: 'specialization',
            required: true,
            include: [{
              model: models.Subject,
              through: {
                where: { is_optional: false }
              },
              as: 'subjects',
              where: { id: subjectId },
              required: true
            }]
          }
        ]
      }),
      // Les élèves qui ont cette UE car elle leur a été attribué par rapport à eux choix
      models.SubjectChoicesVersion.findAll({
        where: {is_active: true},
        include: [{
          model: models.SubjectChoice,
          as: 'choices',
          required: true,
          include: [
            {
              model: models.SpecializationSubject,
              as: 'specializationSubject',
              include: [{
                model: models.Subject,
                as: 'subject',
                where: {id: subjectId},
                required: true
              }],
              required: true
            },
            {
              model: models.Student,
              as: 'student',
              required: true,
              include: [{
                model: models.Specialization,
                as: 'specialization',
                required: true
              }]
            }
          ]
        }]
      })
    ])

    studentSubjectGroup = studentSubjectGroup.reduce((all, item) => [...all, ...item.students], [])

    optionalStudents = optionalStudents.reduce((all, item) => ([
      ...all,
      ...item.choices
        .reduce((students, choice) => {
          const stdIndex = students.findIndex(x => x.id === choice.student.id)
          return stdIndex === -1 ? [...students, choice.student] : students
        }, [])
        .filter(student => !all.map(x => x.id).includes(student.id))
    ]), [])

    if (withoutGroupStudent) {
      const studentSubjectGroupId = studentSubjectGroup.map(student => student.id)
      return [
        ...mandatoryStudents,
        ...optionalStudents
      ].filter(student => !studentSubjectGroupId.includes(student.id))
    } else {
      return [
        ...mandatoryStudents,
        ...optionalStudents,
        ...studentSubjectGroup
      ].reduce((all, item) => {
        const studentIndex = all.findIndex(s => s.id === item.id)
        if (studentIndex === -1) {
          return [...all, item]
        } else {
          return all
        }
      }, [])
    }
  }
})
