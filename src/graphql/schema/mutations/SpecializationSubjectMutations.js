const SpecializationSubjectMutations = `
  input SubjectPropertiesInput {
    subjectId: ID!,
    skillId: ID!,
    isOptional: Boolean!
  }

  extend type Mutation {
    addSubjectsToSpecialization(
      specializationId: ID!,
      subjects: [SubjectPropertiesInput]
    ): [SpecializationSubject]

    removeSubjectFromSpecialization(
      specializationId: ID!,
      subjectId: ID!,
    ): DeletedData
  }
`

export default () => [SpecializationSubjectMutations]
