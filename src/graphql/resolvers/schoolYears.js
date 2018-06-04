import sequelize from 'sequelize'

const { Op } = sequelize

export default models => ({
  allSchoolYears: () => models.SchoolYear.findAll(),
  allSchoolYearsByLabel: (obj, args) => models.SchoolYear.findAll({
    where: {
      label: {
        [Op.like]: `%${args.label}%`
      }
    }
  }),
  schoolYearById: (obj, args) => models.SchoolYear.findById(args.id)
})
