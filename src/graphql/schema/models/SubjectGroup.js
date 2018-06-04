import Student from './Student'
import Subject from './Subject'
import GroupType from './GroupType'

const SubjectGroup = `
type SubjectGroup {
  id: ID!
  label: String!
  type: GroupType!
  subject: Subject!
  students: [Student]
}
`

export default () => [SubjectGroup, Student, Subject, GroupType]
