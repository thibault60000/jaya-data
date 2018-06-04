const SpecializationQueries = `
 extend type Query {
  allSpecializations: [Specialization]
  specializationById(id: ID!): Specialization
  specializationsBySchoolYear(id: ID!): [Specialization]
 }
`

export default () => [SpecializationQueries]
