function generateToken(email, password) {
  if (!email) throw new Error('missing email')
  if (!password) throw new Error('missing password')

  const timestamp = new Date().getTime()
  const token = `${timestamp}_${email}_${password}`
  return token;
}

module.exports = generateToken
