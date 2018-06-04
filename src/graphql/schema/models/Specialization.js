import SchoolYear from './SchoolYear'

const Specialization = `
type Specialization {
  id: ID!
  label: String!
  acronym: String!
  openingChoiceDateS1: String
  closingChoiceDateS1: String
  openingChoiceDateS2: String
  closingChoiceDateS2: String
  schoolYear: SchoolYear!
}
`

export default () => [Specialization, SchoolYear]
