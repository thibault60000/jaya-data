export default sequelize =>
  sequelize.define('StudentSubjectGroup', {
  }, {
    comment: 'Represent the student-group association',
    timestamps: false,
    freezeTableName: true
  })
