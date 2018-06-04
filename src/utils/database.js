export function setUpModels (sequelizeDbObject) {
  // Import all the models
  const SchoolYear = sequelizeDbObject.import(`${__dirname}/../database/models/SchoolYear`)
  const Skill = sequelizeDbObject.import(`${__dirname}/../database/models/Skill`)
  const Subject = sequelizeDbObject.import(`${__dirname}/../database/models/Subject`)
  const Specialization = sequelizeDbObject.import(`${__dirname}/../database/models/Specialization`)
  const SubjectGroup = sequelizeDbObject.import(`${__dirname}/../database/models/SubjectGroup`)
  const Credentials = sequelizeDbObject.import(`${__dirname}/../database/models/Credentials`)
  const Admin = sequelizeDbObject.import(`${__dirname}/../database/models/Admin`)
  const Student = sequelizeDbObject.import(`${__dirname}/../database/models/Student`)
  const Professor = sequelizeDbObject.import(`${__dirname}/../database/models/Professor`)
  const StudentSubjectGroup = sequelizeDbObject.import(`${__dirname}/../database/models/StudentSubjectGroup`)
  const SpecializationSubject = sequelizeDbObject.import(`${__dirname}/../database/models/SpecializationSubject`)
  const SpecializationSkill = sequelizeDbObject.import(`${__dirname}/../database/models/SpecializationSkill`)
  const SubjectChoice = sequelizeDbObject.import(`${__dirname}/../database/models/SubjectChoice`)
  const SubjectChoicesVersion = sequelizeDbObject.import(`${__dirname}/../database/models/SubjectChoicesVersion`)
  const SubjectChoiceResultSet = sequelizeDbObject.import(`${__dirname}/../database/models/SubjectChoiceResultSet`)
  const ProfessorSubject = sequelizeDbObject.import(`${__dirname}/../database/models/ProfessorSubject`)

  // Associations
  Specialization.belongsTo(SchoolYear, { as: 'schoolYear', foreignKey: 'school_year_id', onDelete: 'RESTRICT' })
  SubjectGroup.belongsTo(Subject, { as: 'subject', foreignKey: 'subject_id', onDelete: 'CASCADE' })
  Admin.belongsTo(Credentials, { as: 'credentials', foreignKey: 'credentials_id', onDelete: 'CASCADE' })
  Student.belongsTo(Credentials, { as: 'credentials', foreignKey: 'credentials_id', onDelete: 'CASCADE' })
  Student.belongsTo(Specialization, { as: 'specialization', foreignKey: 'specialization_id', onDelete: 'SET NULL' })
  Professor.belongsTo(Credentials, { as: 'credentials', foreignKey: 'credentials_id', onDelete: 'CASCADE' })

  Student.belongsToMany(SubjectGroup, {
    as: 'groups',
    through: StudentSubjectGroup,
    foreignKey: 'student_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })
  SubjectGroup.belongsToMany(Student, {
    as: 'students',
    through: StudentSubjectGroup,
    foreignKey: 'group_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  Subject.belongsToMany(Specialization, {
    as: 'specializations',
    through: SpecializationSubject,
    foreignKey: 'subject_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })
  Specialization.belongsToMany(Subject, {
    as: 'subjects',
    through: SpecializationSubject,
    foreignKey: 'specialization_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  Specialization.belongsToMany(Skill, {
    as: 'skills',
    through: SpecializationSkill,
    foreignKey: 'specialization_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })
  Skill.belongsToMany(Specialization, {
    as: 'specializations',
    through: SpecializationSkill,
    foreignKey: 'skill_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  Professor.belongsToMany(Subject, {
    as: 'subjects',
    through: ProfessorSubject,
    foreignKey: 'professor_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  Subject.belongsToMany(Professor, {
    as: 'professors',
    through: ProfessorSubject,
    foreignKey: 'subject_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  SpecializationSubject.belongsTo(Specialization, { as: 'specialization', foreignKey: 'specialization_id', onDelete: 'SET NULL' })
  SpecializationSubject.belongsTo(Skill, { as: 'skill', foreignKey: 'skill_id' })
  SpecializationSubject.belongsTo(Subject, { as: 'subject', foreignKey: 'subject_id' })

  SpecializationSkill.belongsTo(Specialization, { as: 'specialization', foreignKey: 'specialization_id', onDelete: 'CASCADE' })
  SpecializationSkill.belongsTo(Skill, { as: 'skill', foreignKey: 'skill_id' })

  SubjectChoicesVersion.belongsTo(SchoolYear, { as: 'schoolYear', foreignKey: 'school_year_id', onDelete: 'RESTRICT' })

  Student.belongsToMany(SpecializationSubject, {
    as: 'chosenSubjects',
    through: SubjectChoice,
    foreignKey: 'student_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  SpecializationSubject.belongsToMany(Student, {
    as: 'studentChoices',
    through: SubjectChoice,
    foreignKey: 'specialization_subject_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  SubjectChoice.belongsTo(Student, { as: 'student', foreignKey: 'student_id', onDelete: 'CASCADE' })
  SubjectChoice.belongsTo(SpecializationSubject, { as: 'specializationSubject', foreignKey: 'specialization_subject_id', onDelete: 'CASCADE' })

  SubjectChoicesVersion.belongsToMany(SubjectChoice, {
    as: 'choices',
    through: SubjectChoiceResultSet,
    foreignKey: 'subject_choices_version_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  SubjectChoice.belongsToMany(SubjectChoicesVersion, {
    as: 'versions',
    through: SubjectChoiceResultSet,
    foreignKey: 'subject_choice_id',
    timestamps: false,
    onDelete: 'CASCADE'
  })

  SubjectChoiceResultSet.belongsTo(SubjectChoicesVersion, { as: 'version', foreignKey: 'subject_choices_version_id', onDelete: 'CASCADE' })
  SubjectChoiceResultSet.belongsTo(SubjectChoice, { as: 'choice', foreignKey: 'subject_choice_id', onDelete: 'CASCADE' })

  return {
    SchoolYear,
    Skill,
    Subject,
    Specialization,
    SubjectGroup,
    Credentials,
    Admin,
    Student,
    Professor,
    StudentSubjectGroup,
    SpecializationSubject,
    SpecializationSkill,
    ProfessorSubject,
    SubjectChoice,
    SubjectChoicesVersion,
    SubjectChoiceResultSet
  }
}

export async function setUpDatabase (sequelizeDbObject, connectToDb = false) {
  console.log(`/!\\ Trying to connect to the DB -> ${process.env.DB_NAME}...`)
  return new Promise((resolve, reject) => {
    const success = () => {
      const models = Object.keys(sequelizeDbObject.models).length === 0
        ? setUpModels(sequelizeDbObject) : sequelizeDbObject.models
      resolve({ orm: sequelizeDbObject, models })
    }

    if (connectToDb) {
      sequelizeDbObject.authenticate()
        .then(() => {
          console.log('DB Connected !')
          success(resolve)
        })
        .catch((e) => {
          console.error('Cannot connect to DB', e.message || e.code || e)
          console.error(e)
          reject(e)
        })
    } else {
      success()
    }
  })
}
