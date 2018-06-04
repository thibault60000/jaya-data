export default (sequelize, DataTypes) =>
  sequelize.define('SpecializationSkill', {
    optionalSubjectsNb: { type: DataTypes.INTEGER, allowNull: false, field: 'optional_subjects_nb' }
  }, {
    comment: 'Represent the specialization-skill association',
    timestamps: false,
    freezeTableName: true
  })
