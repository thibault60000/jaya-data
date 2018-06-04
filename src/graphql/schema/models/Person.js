import Credentials from './Credentials'

const Person = `
interface Person {
  id: ID!
  credentials: Credentials
}
`

export default () => [Person, Credentials]
