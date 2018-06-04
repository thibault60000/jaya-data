import admins from './adminResolvers'
import credentials from './credentialResolvers'
import schoolYears from './schoolYears'
import professors from './professorResolvers'
import skills from './skillResolvers'
import students from './studentResolvers'
import specializations from './specializationResolvers'
import subjects from './subjectResolvers'
import specializationSubjects from './specializationSubjectResolvers'
import specializationSkills from './specializationSkillResolvers'
import subjectChoicesVersions from './subjectChoicesVersionResolvers'
import subjectChoices from './subjectChoiceResolvers'
import subjectGroups from './subjectGroupResolvers'

export default models => ({
  helloWorld: () => "Hello it's me !",
  ...credentials(models),
  ...schoolYears(models),
  ...admins(models),
  ...professors(models),
  ...skills(models),
  ...students(models),
  ...specializations(models),
  ...subjects(models),
  ...specializationSubjects(models),
  ...specializationSkills(models),
  ...subjectChoicesVersions(models),
  ...subjectChoices(models),
  ...subjectGroups(models)
})
