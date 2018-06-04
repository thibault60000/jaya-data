/* eslint-disable import/prefer-default-export */
function _flattenDataValues ({ dataValues }) {
  const flattenedObject = {}

  Object.keys(dataValues).forEach((key) => {
    const dataValue = dataValues[key]

    if (
      Array.isArray(dataValue) &&
      dataValue[0] &&
      dataValue[0].dataValues &&
      typeof dataValue[0].dataValues === 'object'
    ) {
      flattenedObject[key] = dataValues[key].map(_flattenDataValues)
    } else if (dataValue && dataValue.dataValues && typeof dataValue.dataValues === 'object') {
      flattenedObject[key] = _flattenDataValues(dataValues[key])
    } else {
      flattenedObject[key] = dataValues[key]
    }
  })

  return flattenedObject
}

export function sequelizeToPlain (sequelizeResponse) {
  return Array.isArray(sequelizeResponse)
    ? sequelizeResponse.map(_flattenDataValues)
    : _flattenDataValues(sequelizeResponse)
}
