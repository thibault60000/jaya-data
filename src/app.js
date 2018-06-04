import express from 'express'
import bodyParser from 'body-parser'
import * as apolloServer from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import logger from 'morgan'
import cors from 'cors'
import getResolvers from './graphql/resolvers'
import getMutators from './graphql/mutators'
import schema from './graphql/schema'
import { authenticateUser } from './utils/authentication'
import algorithm from './utils/algorithm'

export default class App {
  express;
  sequelize;
  gqlSchema;
  models;

  constructor (sequelizeDbOjbect, models) {
    this.sequelize = sequelizeDbOjbect
    this.models = models
    this._setUpGraphQL()
    this._setUpApp()
    this._setUpRestAPI()
    /*
     * TEST
     */
    // algorithm({ models: this.models })
  }

  _setUpGraphQL = () => {
    this.gqlSchema = makeExecutableSchema({
      typeDefs: [...schema],
      resolvers: {
        Query: {
          ...getResolvers(this.models)
        },
        Mutation: {
          ...getMutators(this.models)
        }
      }
    })
  };

  _setUpApp = () => {
    this.express = express()
    this.express.use(logger('dev'))
    this.express.use(cors())
    this.express.use('/graphql', bodyParser.json(), apolloServer.graphqlExpress(async ({ headers }) => {
      let user = null

      if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
        const token = headers.authorization.split(' ')[1]
        const { data } = await authenticateUser(token)
        user = {
          type: data.type,
          email: data.credentials.email,
          id: data.id
        }
      }

      console.log('User ->', user)

      return {
        context: {
          user
        },
        schema: this.gqlSchema
      }
    }))
    this.express.use('/graphiql', apolloServer.graphiqlExpress({ endpointURL: 'graphql' }))
  };

  _setUpRestAPI = () => {

  }
}
