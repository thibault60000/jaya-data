const ProfessorQueries = `
 extend type Query {
  allProfessors: [Professor]
  professorById(id: ID!): Professor
  professorByEmail(email: String!): Professor
 }
`

export default () => [ProfessorQueries]
