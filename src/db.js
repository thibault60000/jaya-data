import Sequelize from 'sequelize'

const dbURI =
  `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`
const initializedSequelize = new Sequelize(dbURI)

export default initializedSequelize
