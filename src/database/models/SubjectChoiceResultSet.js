export default (sequelize, DataTypes) =>
  sequelize.define('SubjectChoiceResultSet', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    comment: 'Link between student choices & choices version',
    timestamps: false,
    freezeTableName: true
  })
