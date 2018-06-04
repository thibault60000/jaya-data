/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import 'babel-polyfill'
import * as awsServerlessExpress from 'aws-serverless-express'
import App from './app'
import sequelize from './db'
import { setUpDatabase } from './utils/database'

export const handler = (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false
  setUpDatabase(sequelize, false)
    .then(({ models }) => {
      const JayaData = new App(sequelize, models)
      const server = awsServerlessExpress.createServer(JayaData.express)
      return awsServerlessExpress.proxy(server, event, context)
    })
}
