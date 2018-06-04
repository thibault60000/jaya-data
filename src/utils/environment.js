export default {
  prod: process.env.ENV === 'production',
  dev: process.env.ENV !== 'production'
}
