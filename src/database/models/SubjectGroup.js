import GroupType from '../enums/GroupType'

export default (sequelize, DataTypes) =>
  sequelize.define('SubjectGroup', {
    label: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM, values: GroupType }
  }, {
    comment: 'Group about a subject',
    timestamps: false,
    freezeTableName: true
  })
