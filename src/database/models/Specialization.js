export default (sequelize, DataTypes) =>
  sequelize.define('Specialization', {
    label: { type: DataTypes.STRING, allowNull: false },
    acronym: { type: DataTypes.STRING(15), allowNull: false },
    openingChoiceDateS1: { type: DataTypes.STRING, allowNull: true, field: 'opening_choice_date_s1' },
    closingChoiceDateS1: { type: DataTypes.STRING, allowNull: true, field: 'closing_choice_date_s1' },
    openingChoiceDateS2: { type: DataTypes.STRING, allowNull: true, field: 'opening_choice_date_s2' },
    closingChoiceDateS2: { type: DataTypes.STRING, allowNull: true, field: 'closing_choice_date_s2' }
  }, {
    comment: 'The general purpose of a school year',
    timestamps: false,
    freezeTableName: true
  })
