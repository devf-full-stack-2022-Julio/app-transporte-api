const managers = require('../managers')

function generateToken(email, password) {
  if (!email) throw new Error('missing email')
  if (!password) throw new Error('missing password')

  const timestamp = new Date().getTime()
  const token = `${timestamp}_${email}_${password}`
  return token;
}

function userLogin(req, res) {
  const { email, password } = req.body

  let loggedUser = null
  try {
    loggedUser = managers.users.login(email, password)
  } catch(err) {
      return res.status(402).json({ message: err.message })
  }

  // Generar una llave de sesión
  const sessionToken = generateToken(loggedUser.email, loggedUser.password)

  // Guardar en el usuario 
  managers.users.saveToken(loggedUser.email, sessionToken)

  return res.status(200).json({ token: sessionToken, user: loggedUser })
}

function userRegister(req, res) {
  const { email, password } = req.body

  let createdUser = null
  try {
    createdUser = managers.users.create(email, password)
  } catch(err) {
      return res.status(403).json({ message: err.message })
  }

  return res.status(200).json(createdUser)
}

function userInfo(req, res) {
  const user = req.user
  if (!user) throw new Error('missing user in req')

  res.status(200).json({ email: user.email });
}

module.exports = {
  users: {
    login: userLogin,
    register: userRegister,
    getInfo: userInfo
  }
}