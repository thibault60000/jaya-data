import 'babel-polyfill'
import '../setup.local'
import App from './app'
import sequelize from './db'
import { setUpDatabase } from './utils/database'

setUpDatabase(sequelize, false)
  .then(({ orm, models }) => {
    const JayaData = new App(orm, models)

    JayaData.express.listen(4000, () => {
      console.log('Jaya Data Service -> Listen to port 4000 :)')
      console.log(' => Go to http://localhost:4000/graphiql to run GQL Queries')
    })
  })
  .catch(error => console.error(error))
