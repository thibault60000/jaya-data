export default (sequelize, DataTypes) =>
  sequelize.define('Credentials', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, allowNull: false, field: 'is_verified' }
  }, {
    comment: 'User s credentials',
    timestamps: false,
    freezeTableName: true
  })
