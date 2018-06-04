const AdminQueries = `
 extend type Query {
   allAdmins: [Admin]
   adminById(id: ID!): Admin
   adminByEmail(email: String!): Admin
 }
`

export default () => [AdminQueries]
