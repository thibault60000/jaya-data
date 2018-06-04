import Semester from '../enums/Semester'

export default (sequelize, DataTypes) =>
  sequelize.define('Subject', {
    label: { type: DataTypes.STRING, allowNull: false },
    apogeeCode: { type: DataTypes.STRING, allowNull: false, field: 'apogee_code', unique: true },
    description: { type: DataTypes.TEXT, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false },
    semester: { type: DataTypes.ENUM, values: Semester, allowNull: false }
  }, {
    comment: 'School subjects that MIAGE offers',
    timestamps: false,
    freezeTableName: true
  })
