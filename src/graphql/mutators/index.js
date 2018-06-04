import admins from './adminMutators'
import professors from './professorMutators'
import students from './studentMutators'
import specializations from './specializationMutators'
import skills from './skillMutators'
import subjects from './subjectMutators'
import specializationSubjects from './specializationSubjectMutators'
import specializationSkills from './specializationSkillsMutators'
import algorithms from './algorithmMutators'
import subjectChoicesVersions from './subjectChoicesVersionMutators'
import subjectChoices from './subjectChoiceMutators'
import subjectGroups from './subjectGroupMutators'
import credentials from './credentialsMutators'

export default models => ({
  goodByeWorld: (_, { message }) => message,
  ...admins(models),
  ...professors(models),
  ...students(models),
  ...specializations(models),
  ...skills(models),
  ...subjects(models),
  ...specializationSubjects(models),
  ...specializationSkills(models),
  ...algorithms(models),
  ...subjectChoicesVersions(models),
  ...subjectChoices(models),
  ...subjectGroups(models),
  ...credentials(models)
})
