const SchoolYearQueries = `
 extend type Query {
  allSchoolYears: [SchoolYear]
  allSchoolYearsByLabel(label: String!): [SchoolYear]
  schoolYearById(id: ID!): SchoolYear
 }
`

export default () => [SchoolYearQueries]
