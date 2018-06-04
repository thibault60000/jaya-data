export default models => ({
  allCredentials: () => models.Credentials.findAll(),
  credentialsByEmail: (obj, { email }) => models.Credentials.findOne({
    where: { email }
  })
})
