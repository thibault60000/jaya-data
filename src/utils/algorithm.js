import _ from 'lodash'
/**
 * Récupération des données nécéssaires au traitement
 * @param models
 * @param schoolYearId
 * @param semester
 * @returns {Promise<{rawSpecializationSkills: any, rawStudents: any, rawSpecializationSubjects: any}>}
 * @private
 */
async function _getData ({ models, schoolYearId, semester }) {
  const schoolYear = await models.SchoolYear.findById(schoolYearId)
  let [ rawSpecializationSkills, rawStudents, rawSpecializationSubjects ] = await Promise.all([
    models.SpecializationSkill.findAll({
      include: [
        {
          model: models.Specialization,
          as: 'specialization',
          where: { school_year_id: schoolYear.id }
        },
        {
          model: models.Skill,
          as: 'skill'
        }
      ]
    }),
    models.Student.findAll({
      include: [
        {
          model: models.Specialization,
          as: 'specialization',
          where: { school_year_id: schoolYear.id }
        },
        {
          model: models.SpecializationSubject,
          through: {
            attributes: ['id', 'rank'],
            as: 'info'
          },
          as: 'chosenSubjects',
          include: [{
            model: models.Subject,
            as: 'subject',
            where: { semester }
          }]
        }
      ]
    }),
    models.SpecializationSubject.findAll({
      include: [
        {
          model: models.Specialization,
          as: 'specialization',
          where: { school_year_id: schoolYear.id }
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
      ],
      where: { is_optional: true }
    })
  ])

  return {
    rawSpecializationSkills,
    rawStudents,
    rawSpecializationSubjects
  }
}

/**
 * Formatter les données pour faciliter la mise en place de l'algorithme
 * @param rawSpecializationSkills
 * @param rawStudents
 * @param rawSpecializationSubjects
 * @returns {{students: *, subjects: *, skills: *}}
 * @private
 */
function _formatData ({ rawSpecializationSkills, rawStudents, rawSpecializationSubjects }) {
  const students = rawStudents.map(x => ({
    id: x.id,
    specializationId: x.specialization.id,
    choices: x.chosenSubjects
      .map(y => ({
        id: y.info.id,
        subjectId: y.subject_id,
        rank: y.info.rank
      }))
      .sort((a, b) => {
        if (a.rank < b.rank) {
          return -1
        } else if (a.rank > b.rank) {
          return 1
        }
        return 0
      })
  }))

  const maxChoicesNb = Math.max(...students.map(x => x.choices.length))

  for (let student of students) {
    while (student.choices.length < maxChoicesNb) {
      student.choices.push(null)
    }
  }

  const subjects = rawSpecializationSubjects.reduce((all, item) => {
    const subjectIndex = all.findIndex(x => x.id === item.subject.id)

    if (subjectIndex === -1) {
      const subject = {
        id: item.subject.id,
        capacity: item.subject.capacity,
        specializations: [{ id: item.specialization.id, skillId: item.skill.id }]
      }

      return [...all, subject]
    } else {
      return [
        ...all.filter(x => x.id !== item.subject.id),
        {
          ...all[subjectIndex],
          specializations: [...all[subjectIndex].specializations, { id: item.specialization.id, skillId: item.skill.id }]
        }
      ]
    }
  }, [])

  const skills = rawSpecializationSkills.reduce((all, item) => {
    const skillIndex = all.findIndex(x => x.id === item.skill.id)

    if (skillIndex === -1) {
      const skill = {
        id: item.skill.id,
        label: item.skill.label,
        specializations: [{ id: item.specialization.id, optionalSubjectsNb: item.optionalSubjectsNb }]
      }

      return [...all, skill]
    } else {
      return [
        ...all.filter(x => x.id !== item.skill.id),
        {
          ...all[skillIndex],
          specializations: [...all[skillIndex].specializations, { id: item.specialization.id, optionalSubjectsNb: item.optionalSubjectsNb }]
        }
      ]
    }
  }, [])

  return {
    students,
    subjects,
    skills
  }
}

/**
 * L'alorithme en lui même
 * @param students
 * @param subjects
 * @param skills
 * @returns {{results: Array, subjectsStatus: Array}}
 * @private
 */
function _runChoicesAlgorithm ({ students, subjects, skills }) {
  const iterationNumber = Math.max(...students.map(x => x.choices.length))
  let results = []
  let subjectsStatus = []

  // On randomize les étudiants
  const shuffledStudents = _.shuffle(students)

  // On va itérer sur chaque index de choix
  for (let x = 0; x < iterationNumber; x++) {
    // Pour chaque index de choix on va itérer sur tous les élèves
    for (let { id, specializationId, choices } of shuffledStudents) {
      // Si la valeur du choix est null (car auparavant on a égalisé la taille des tableaux de choix en remplissant ceux qui étaient plus petit avec des null), on ne traite pas le choix
      if (choices[x] != null) {
        // On tente de récupérer l'index de l'instance du résultat pour l'étudiant courant
        const studentResultIndex = results.findIndex(y => y.studentId === id)
        // On tente de récupérer l'index de l'état de l'UE (combien d'élève il y a actuellement a l'intérieur)
        const subjectStatusIndex = subjectsStatus.findIndex(y => y.subjectId === choices[x].subjectId)

        if (studentResultIndex === -1) {
          // Cas ou l'étudiant n'est pas encore dans le tableau des résultats (donc 0 choix affectés)
          if (subjectStatusIndex === -1) {
            // Cas ou le statut de l'UE n'est pas encore dans le tableau des états d'UE (donc elle est vide)

            // On affecte l'UE à l'étudiant en créant une nouvelle instance de l'étudiant avec ses choix
            results = [
              ...results,
              {
                studentId: id,
                /**
                 * Pour chaque choix potentiellement validé on enregistre l'ID de l'UE concernée mais également sa compétence
                 * déterminée selon le parcours de l'étudiant
                 */
                choices: [{
                  id: choices[x].id,
                  subjectId: choices[x].subjectId,
                  skillId: subjects
                    .find(y => y.id === choices[x].subjectId)
                    .specializations
                    .find(y => y.id === specializationId)
                    .skillId
                }]
              }
            ]

            // On ajoute un objet qui sert au final de cache pour l'UE courante qui indique combien d'élève on a affecté
            subjectsStatus = [
              ...subjectsStatus,
              {
                subjectId: choices[x].subjectId,
                students: 1
              }
            ]
          } else {
            // Cas ou le sttut de l'UE existe déjà dans le tableau qui contient tous les état d'UE
            if (subjectsStatus[subjectStatusIndex].students < subjects.find(y => y.id === choices[x].subjectId).capacity) {
              // Si il y a encore de la place dans l'UE

              // On ajoute un nouvel objet pour l'étudiant (qui n'existe pas encore) avec son choix courant
              results = [
                ...results,
                {
                  studentId: id,
                  choices: [{
                    id: choices[x].id,
                    subjectId: choices[x].subjectId,
                    skillId: subjects
                      .find(y => y.id === choices[x].subjectId)
                      .specializations
                      .find(y => y.id === specializationId)
                      .skillId
                  }]
                }
              ]

              // On récupére le tableau des statuts d'UE sans le statut de l'UE courant qu'on réinjecte ensuite en ayant incrémenté son nombre d'étudiants de 1
              subjectsStatus = [
                ...subjectsStatus.filter(y => y.subjectId !== subjectsStatus[subjectStatusIndex].subjectId),
                {
                  ...subjectsStatus[subjectStatusIndex],
                  students: subjectsStatus[subjectStatusIndex].students + 1
                }
              ]
            }
          }
        } else {
          // Cas ou l'objet étudiant existe déjà et donc que l'étudiant a déjà des UE affectée

          // On récupère des données qui vont nous servir pour les vérifications
          const subject = subjects.find(y => y.id === choices[x].subjectId)
          const skillId = subject.specializations
            .find(y => y.id === specializationId)
            .skillId

          const { optionalSubjectsNb } = skills.find(y => y.id === skillId)
            .specializations
            .find(y => y.id === specializationId)

          if (results[studentResultIndex].choices.map(y => y.skillId === skillId).length < optionalSubjectsNb) {
            // Cas ou l'étudiant, pour la compétence concernée par l'UE courante, n'a pas encore atteint le nombre d'UE optionnelle à choisir
            if (subjectStatusIndex === -1) {
              // Cas ou le statut de l'UE en cours n'existe pas

              // On récupère le tableau des étudiants sans l'étudiant courant, et on réinjecte son objet modifié avec le choix en cours
              results = [
                ...results.filter(y => y.studentId !== results[studentResultIndex].studentId),
                {
                  ...results[studentResultIndex],
                  choices: [
                    ...results[studentResultIndex].choices,
                    {
                      id: choices[x].id,
                      subjectId: choices[x].subjectId,
                      skillId
                    }
                  ]
                }
              ]

              // On ajoute au tableau des statut d'UE une instance représentant l'UE courante et on met son nombre d'élève a 1
              subjectsStatus = [
                ...subjectsStatus,
                {
                  subjectId: choices[x].subjectId,
                  students: 1
                }
              ]
            } else {
              // Cas ou le statut de l'UE en cours existe déjà
              if (subjectsStatus[subjectStatusIndex].students < subject.capacity) {
                // On vérifie que l'on a pas dépassé la capacité de l'UE pour incrémenter les choix de l'étudiant et le nb d'élèves dans l'UE

                results = [
                  ...results.filter(y => y.studentId !== results[studentResultIndex].studentId),
                  {
                    ...results[studentResultIndex],
                    choices: [
                      ...results[studentResultIndex].choices,
                      {
                        id: choices[x].id,
                        subjectId: choices[x].subjectId,
                        skillId
                      }
                    ]
                  }
                ]

                subjectsStatus = [
                  ...subjectsStatus.filter(y => y.subjectId !== subjectsStatus[subjectStatusIndex].subjectId),
                  {
                    ...subjectsStatus[subjectStatusIndex],
                    students: subjectsStatus[subjectStatusIndex].students + 1
                  }
                ]
              }
            }
          }
        }
      }
    }
  }
  return { results, subjectsStatus }
}

async function splitStudentsIntoOptionalSubjects ({ models, schoolYearId, semester }) {
  const {
    rawSpecializationSkills,
    rawStudents,
    rawSpecializationSubjects
  } = await _getData({ models, schoolYearId, semester })

  const {
    students,
    subjects,
    skills
  } = _formatData({ rawStudents, rawSpecializationSkills, rawSpecializationSubjects })

  const { results, subjectsStatus } = _runChoicesAlgorithm({ students, skills, subjects })

  console.log(JSON.stringify(students))
  console.log(JSON.stringify(results))
  console.log(JSON.stringify(subjectsStatus))

  // Mise en forme
  return { students, results, subjectsStatus }
}

export default splitStudentsIntoOptionalSubjects
