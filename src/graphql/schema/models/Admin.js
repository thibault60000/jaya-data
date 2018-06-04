import Person from './Person'

const Admin = `
type Admin implements Person {
  id: ID!
  credentials: Credentials!
}
`

export default () => [Person, Admin]
