export default models => ({
  adminSetPassword: async (_, { credentialsId, password }) => {
    const credentials = await models.Credentials.findById(credentialsId)

    return credentials.update({
      password
    }, { returning: true })
  }
})
