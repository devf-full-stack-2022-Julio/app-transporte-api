const managers = require('../managers')
const utils = require('../utils');

function userLogin(req, res) {
  const { email, password } = req.body

  // Validar data
  if (!email) return res.status(400).json({ message: 'missing email in body'})
  if (!password) return res.status(400).json({ message: 'missing password in body'})

  let loggedUser = null
  try {
    loggedUser = managers.users.login(email, password)
  } catch(err) {
      return res.status(402).json({ message: err.message })
  }

  // Generar una llave de sesión
  const sessionToken = utils.generateToken(loggedUser.email, loggedUser.password)

  // Guardar en el usuario 
  managers.users.saveToken(loggedUser.email, sessionToken)

  delete loggedUser.password
  delete loggedUser.session_token
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