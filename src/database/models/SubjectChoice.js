export default (sequelize, DataTypes) =>
  sequelize.define('SubjectChoice', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rank: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    comment: 'Store the choices made by the student',
    timestamps: false,
    freezeTableName: true
  })
