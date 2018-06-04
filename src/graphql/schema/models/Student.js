import Credentials from './Credentials'
import Specialization from './Specialization'
import SubjectGroup from './SubjectGroup'

const Student = `
type Student implements Person {
  id: ID!
  firstName: String!
  lastName: String!
  studentNumber: String!
  credentials: Credentials!
  specialization: Specialization!
  groups: [SubjectGroup]
}
`

export default () => [Student, Credentials, Specialization, SubjectGroup]
