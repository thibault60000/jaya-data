const SpecializationMutations = `
  extend type Mutation {
    createSpecialization(
      label: String!,
      acronym: String!,
      schoolYearId: ID!
      openingChoiceDateS1: String
      closingChoiceDateS1: String
      openingChoiceDateS2: String
      closingChoiceDateS2: String
    ): Specialization
    updateSpecialization(
      id: ID!,
      label: String!,
      acronym: String!,
      schoolYearId: ID!
      openingChoiceDateS1: String
      closingChoiceDateS1: String
      openingChoiceDateS2: String
      closingChoiceDateS2: String
    ): Specialization
    deleteSpecialization(id: ID!): DeletedData
  }
`

export default () => [SpecializationMutations]
