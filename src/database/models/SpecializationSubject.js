export default (sequelize, DataTypes) =>
  sequelize.define('SpecializationSubject', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isOptional: { type: DataTypes.BOOLEAN, allowNull: false, field: 'is_optional' }
  }, {
    comment: 'Represent the specialization-subject association',
    timestamps: false,
    freezeTableName: true
  })
