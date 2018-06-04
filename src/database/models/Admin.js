export default sequelize =>
  sequelize.define('Admin', {
  }, {
    comment: 'Admin account',
    timestamps: false,
    freezeTableName: true
  })
